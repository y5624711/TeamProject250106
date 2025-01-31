package com.example.backend.service.state.instk;

import com.example.backend.dto.state.instk.Instk;
import com.example.backend.dto.state.instk.InstkDetail;
import com.example.backend.mapper.standard.commonCode.CommonMapper;
import com.example.backend.mapper.standard.item.ItemMapper;
import com.example.backend.mapper.standard.location.LocationMapper;
import com.example.backend.mapper.state.instk.InstkMapper;
import com.example.backend.mapper.state.instk.InstkSubMapper;
import com.example.backend.mapper.stock.inoutHistory.InoutHistoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class InstkService {
    final InstkMapper mapper;
    final ItemMapper itemMapper;
    final CommonMapper commonMapper;
    final InoutHistoryMapper inoutHistoryMapper;
    final InstkSubMapper instkSubMapper;
    final LocationMapper locationMapper;

    public  Map<String,Object> viewlist(String state, Integer page, String keyword, String sort, String order) {
        int count = mapper.countByConsent(state,keyword);
        int offset = (page - 1) * 10;
         List<Instk> instkList = mapper.viewBuyInList(offset,state,keyword,sort,order);

         Map<String,Object> returnMap = Map.of("list",instkList ,"count",count);

        return  returnMap;

    }

    public Instk detailView(int inputKey) {

        //시리얼 번호 목록 
       List<Integer> serialList= instkSubMapper.getSerialNoByInputKey(inputKey);

        System.out.println("serialList = " + serialList);
        //  입고시 비고내용
         String inputStockNote= mapper.getInstkNoteByInputKey(inputKey,serialList.get(0));
//
        System.out.println("inputStockNote = " + inputStockNote);

      Instk instk = new Instk();
      instk.setInputNote(inputStockNote);
      instk.setSerialList(serialList);
      return instk;

    }

   

    public boolean addInstkProcess(Instk instk) {

        System.out.println("instk = " + instk);

        int inputKey = instk.getInputKey();
        String inputStockNote = instk.getInputNote();
        String inputStockEmployeeNo=instk.getInputStockEmployeeNo();
        String inoutNo=  "IN" + instk.getInputNo().substring(2);
        String inputCommonCode=instk.getInputCommonCode();
        String wareHouseCode=mapper.viewWareHouseCode(instk.getInputStockEmployeeNo());
        // 가입고  상태 변환
         int updateChecked =   mapper.updateBuyInConsentByInputKey(inputKey);
        System.out.println("updateChecked = " + updateChecked);

        // 그냥 입고일때 , TODO 수량만큼  +1, 테이블도 그만큼
        if(instk.getInputCommonCode().equals("INSTK")) {
            // 품목 공통코드 조회
            String itemCommonCode = commonMapper.viewCommonCodeByCodeName(instk.getItemCommonName());
            //품목 상세에서 같은 코드 시리얼 넘버 맥스 뭔지 찾아오기
            Integer maxSerialNo = itemMapper.viewMaxSerialNoByItemCode(itemCommonCode);
            String insertSerialNo = String.format("%20d", (maxSerialNo == null) ? 1 : maxSerialNo + 1);
            int insertItemSub = itemMapper.addItemSub(itemCommonCode, insertSerialNo, "WHS");
            //입고 테이블
           int insertInstk= mapper.addInstk(inputKey,inputStockNote,inputStockEmployeeNo);
            //입고 상세 테이블
            int insertItstkSub=mapper.addInstkSub(inputKey,insertSerialNo);
            //입고 승인자 일하는 창고 코드 가져오기
          int inInoutHistory=  mapper.addInOutHistory(insertSerialNo,inputCommonCode.trim(),wareHouseCode,instk.getInputStockEmployeeNo(),instk.getRequestEmployeeNo(),instk.getInputStockNote(),inoutNo);

            return (insertItemSub==1 && insertInstk == 1 && insertItstkSub == 1 && inInoutHistory == 1);
        }
            // 회수 입고 , 품목상세에서 현재 위치 변경 , 입출내역에 추가
        else if(instk.getInputCommonCode().equals("RETRN")) {
            //현재 위치 창고로 변경 , serialNo 가져오는거 생각해야함
            String itemSerialNo= mapper.getReturnSerialNo(instk.getInputNo());
            System.out.println("itemSerialNo = " + itemSerialNo);
            int currentCommonCode= itemMapper.updateCurrentCommonCodeBySerialNo(itemSerialNo);
            // 입고 테이블
            int insertInstk = mapper.addInstk(inputKey,inputStockNote,inputStockEmployeeNo);
            //입고 상세 테이블
            int insertItstkSub= mapper.addInstkSub(inputKey,itemSerialNo);
            //인아웃 히스토리 집어 넣기

            System.out.println("wareHouseCode = " + wareHouseCode);
            
            System.out.println("inputCommonCode = " + inputCommonCode);
            System.out.println("inputCommonCode = " + inputCommonCode.length());
            
            int inInoutHistory= mapper.addInOutHistory(itemSerialNo,inputCommonCode.trim(),wareHouseCode,instk.getInputStockEmployeeNo(),instk.getRequestEmployeeNo(),instk.getInputStockNote(),inoutNo);

            return (currentCommonCode == 1 && insertInstk == 1 && insertItstkSub == 1 && inInoutHistory == 1);
        }
        // 둘 다 아닐때
        return false;
    }

    //  반품 승인 테이블에 창고코드 만들면 하나로 합칠수 있음
    public InstkDetail confirmView(String inputNo, String inputCommonCode) {
        System.out.println("inputCommonCode = " + inputCommonCode);
        // 그냥 입고 ,구매승인가서 , 창고 코드 , 창고 코드 가서
        if(inputCommonCode.equals("INSTK")) {
              InstkDetail instkDetail = mapper.viewWareHouse(inputNo);
              return instkDetail;
        }   //     반품 입고
        else if(inputCommonCode.equals("RETRN")) {
            InstkDetail instkDetail = mapper.viewReturnWareHouse(inputNo);
            return instkDetail;
        }
        return null;
    }

    // 입고 반려
    public Boolean[] rejectInstk(int inputKey) {
        //기존 입고삳태
        Boolean selectedConsent =mapper.selectedConsent(inputKey);
        // 업데이트한 입고상태
        int cnt =mapper.rejectInstk(inputKey);


        return  new Boolean[] {selectedConsent,cnt==1};
    }
}

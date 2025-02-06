package com.example.backend.service.state.instk;

import com.example.backend.dto.state.instk.Instk;
import com.example.backend.dto.state.instk.InstkDetail;
import com.example.backend.dto.state.instk.InstkSerialLocation;
import com.example.backend.mapper.standard.commonCode.CommonMapper;
import com.example.backend.mapper.standard.item.ItemMapper;
import com.example.backend.mapper.state.instk.InstkMapper;
import com.example.backend.mapper.state.instk.InstkSubMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
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
    final InstkSubMapper instkSubMapper;

    public  Map<String,Object> viewlist(String state, Integer page, String keyword, String sort, String order, String type, Authentication authentication) {

        String employeeNo=authentication.getName();
        String company = null;
        if (employeeNo.startsWith("CUS")) {
            company = mapper.selectCompanyById(employeeNo);
        }

        int count = mapper.countByConsent(state,keyword,type,company);
        int offset = (page - 1) * 10;
         List<Instk> instkList = mapper.viewBuyInList(offset,state,keyword,sort,order,type,company);

         Map<String,Object> returnMap = Map.of("list",instkList ,"count",count);

        return  returnMap;

    }

    // 일반입고 , 회수 입고 , 반려 , 각 상태에따라 상태정보 불러오는 함수
    public Instk detailView(int inputKey, String inputCommonCodeName) {
        
        //창고 가져오는곳은 동일 해서 앞으로 뺌
        String warehouseName = "";
        String warehouseAddress = "";

       Boolean inputConsent=mapper.viewInputConsetByInputKey(inputKey);

        if (inputCommonCodeName.equals("입고")) {
            Map<String, Object> whmData = mapper.viewWareHouseName(inputKey);
            warehouseName = (String) whmData.get("warehouseName");
            warehouseAddress = (String) whmData.get("warehouseAddress");

        } else {
            Map<String, Object> whmData =mapper.viewReturnWareHouseName(inputKey);
            warehouseName = (String) whmData.get("warehouseName");
            warehouseAddress = (String) whmData.get("warehouseAddress");
        }

        // 입고 회수 /
        if(inputConsent) {
            //(입고,회수)된 시리얼 번호 목록
            List<InstkSerialLocation> serialLocationList = instkSubMapper.getSerialNoByInputKey(inputKey);
            //  (입고,회수)시 비고내용
            String inputStockNote = mapper.getInstkNoteByInputKey(inputKey);

            //일반 입고와 회수입고 창고에서 가져오는 위치

            System.out.println("serialLocationList = " + serialLocationList);

            Instk instk = new Instk();
            instk.setInputStockNote(inputStockNote);
            instk.setSerialLocationList(serialLocationList);
            instk.setWareHouseName(warehouseName);
            instk.setWareHouseAddress(warehouseAddress);
            instk.setInputConsent(inputConsent);
            System.out.println("instk = " + instk);
            return instk;
        }else {  //반려 처리

            //반려 승인자 , 반려자 사번 ,  반려 노트 ,  반려 날짜
           Instk instk= mapper.viewDisapproveByInputKey(inputKey);
            instk.setWareHouseName(warehouseName);
            instk.setWareHouseAddress(warehouseAddress);
            instk.setInputConsent(inputConsent);
            return instk;
        }


    }

   

    public boolean addInstkProcess(Instk instk) {

        System.out.println("instk = " + instk);

        int inputKey = instk.getInputKey();
        String inputStockNote = instk.getInputNote();
        String inputStockEmployeeNo=instk.getInputStockEmployeeNo();
        String inoutNo=   instk.getInputNo();
        String inputCommonCode=instk.getInputCommonCode();


        // 가입고  상태 변환
         int updateChecked =   mapper.updateBuyInConsentByInputKey(inputKey);

        boolean  checked=true ;

        // 그냥 입고일때 , TODO 수량만큼  +1, 테이블도 그만큼
        if(instk.getInputCommonCode().equals("INSTK")) {
            // 품목 공통코드 조회
            String itemCommonCode = commonMapper.viewCommonCodeByCodeName(instk.getItemCommonName());

            //인풋키 기준으로 창고 코드 가져오도록
            String wareHouseCode=mapper.viewWareHouseCode(inputKey);
            System.out.println("입고 wareHouseCode = " + wareHouseCode);
            //입고 테이블
            int insertInstk= mapper.addInstk(inputKey,inputStockNote,inputStockEmployeeNo);

            // String 타입의 itemAmount를 int로 변환
            int itemAmount = Integer.parseInt(instk.getItemAmount()); // 숫자로 변환

            //주문 수량 만큼 반복해야하는것들
            for (int i = 0; i < itemAmount; i++) {

                // 품목 상세에서 시리얼 넘버 최대값 가져오기
                Integer maxSerialNo = itemMapper.viewMaxSerialNoByItemCode(itemCommonCode);

                // 시리얼 번호 생성 (20자리)
                String insertSerialNo ="S"+ String.format("%05d", (maxSerialNo == null) ? 1 : maxSerialNo + 1);

                // item_sub 테이블에 추가
                int insertItemSub = itemMapper.addItemSub(itemCommonCode, insertSerialNo, "WHS");

                // 입고 상세 테이블 추가
                int insertItstkSub = mapper.addInstkSub(inputKey, insertSerialNo ,wareHouseCode);

                // 입고 승인자의 창고 코드 기반으로 이력 추가
                int inInoutHistory = mapper.addInOutHistory(
                        insertSerialNo,
                        inputCommonCode.trim(),
                        wareHouseCode,
                        instk.getInputStockEmployeeNo(),
                        instk.getRequestEmployeeNo(),
                        instk.getInputStockNote(),
                        inoutNo,
                        inputKey);
                checked &= (insertItemSub == 1) & (insertItstkSub == 1) & (inInoutHistory == 1);
            }
            // 다 들어갔는지 체크하는거 필요함
            return checked && updateChecked == 1 && insertInstk == 1;
        }
            // 회수 입고 , 품목상세에서 현재 위치 변경 , 입출내역에 추가
        else if(instk.getInputCommonCode().equals("RETRN")) {
            //시리얼 번호 가져오기
            String itemSerialNo= mapper.getReturnSerialNo(instk.getInputNo());
            
            //창고 코드
            String wareHouseCode=mapper.viewRetrunWareHouseCode(inputKey);
            System.out.println("반품 wareHouseCode = " + wareHouseCode);
            //품목 상세 현재위치 창고로 변경
            int currentCommonCode= itemMapper.updateCurrentCommonCodeBySerialNo(itemSerialNo);
            // 입고 테이블
            int insertInstk = mapper.addInstk(inputKey,inputStockNote,inputStockEmployeeNo);
            //입고 상세 테이블
            int insertItstkSub= mapper.addInstkSub(inputKey,itemSerialNo, wareHouseCode);
            //인아웃 히스토리 집어 넣기

            // 인풋
            int inInoutHistory= mapper.addInOutHistory(itemSerialNo,inputCommonCode.trim(),wareHouseCode,instk.getInputStockEmployeeNo(),instk.getRequestEmployeeNo(),instk.getInputStockNote(),inoutNo ,inputKey);

            return (currentCommonCode == 1 && insertInstk == 1 && insertItstkSub == 1 && inInoutHistory == 1 &&updateChecked==1);
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
            System.out.println("instkDetail = " + instkDetail);
              return instkDetail;
        }   //     반품 입고
        else if(inputCommonCode.equals("RETRN")) {
            InstkDetail instkDetail = mapper.viewReturnWareHouse(inputNo);
            System.out.println("instkDetail = " + instkDetail);
            return instkDetail;
        }
        return null;
    }

    // 입고 반려
    public boolean rejectInstk(Instk instk) {
        //반려 체크
//        Boolean currentStatus = mapper.selectedConsent(instk.getInputKey());
        //업데이트 체크
        int inputKey=instk.getInputKey();
        String disApproveNote=instk.getDisapproveNote();
        String disApproveEmployeeNo=instk.getDisapproveEmployeeNo();

        //1.가입고 테이블 상태 변경
        int updateBuyInConsentByInputKey=mapper.updateFalseBuyInConsentByInputKey(inputKey);
        //반려테이블에 집어넣기 
        int updateResult = mapper.rejectInstk(inputKey,disApproveEmployeeNo,disApproveNote);
        return updateResult == updateBuyInConsentByInputKey;
    }

    public boolean authorityCheck(Authentication authentication, String customerName) {

        if (authentication.getName().startsWith("CUS")) {
            String loginEmployeeNo= authentication.getName();
            String same = mapper.authorityCheck(loginEmployeeNo ,customerName);
            return same != null;
        }
        //biz 본사직원이면 성공
        return true;

    }
}

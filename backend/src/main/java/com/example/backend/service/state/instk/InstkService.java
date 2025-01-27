package com.example.backend.service.state.instk;

import com.example.backend.dto.state.instk.Instk;
import com.example.backend.mapper.standard.commonCode.CommonMapper;
import com.example.backend.mapper.standard.item.ItemMapper;
import com.example.backend.mapper.state.instk.InstkMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class InstkService {
    final InstkMapper mapper;
    final ItemMapper itemMapper;
    final CommonMapper commonMapper;

    public List<Instk> viewlist() {
         List<Instk> instkList = mapper.viewBuyInList();

        return  instkList;

    }

    public Instk detailView(int inputKey) {

        //시리얼 번호 목록 
       List<Integer> serialList= mapper.getSerialNoByInputKey(inputKey);

        System.out.println("serialList = " + serialList);
        //  입고시 비고내용
         String inputStockNote= mapper.getInstkNoteByInputKey(inputKey,serialList.get(0));


//
        System.out.println("inputStockNote = " + inputStockNote);

      Instk instk = new Instk();
      instk.setInputNote(inputStockNote);
      instk.setSerialList(serialList);
        System.out.println("instk = " + instk);
      return instk;

    }

   

    public void addInstkProcess(Instk instk) {


        // 가입고  상태 변환
         int updateChecked =   mapper.updateBuyInConsentByInputKey(instk.getInputKey());
        System.out.println("updateChecked = " + updateChecked);

        // 그냥 입고일때 , TODO 수량만큼  +1, 테이블도 그만큼
        if(!instk.getInputCommonCode().equals("INSTK")) {
            // 품목 공통코드 조회
            String itemCommonCode = commonMapper.viewCommonCodeByCodeName(instk.getItemCommonName());
            //품목 상세에서 같은 코드 시리얼 넘버 맥스 뭔지 찾아오기
            Integer maxSerialNo = itemMapper.viewMaxSerialNoByItemCode(itemCommonCode);
            String insertSerialNo = String.format("%20d", (maxSerialNo == null) ? 1 : maxSerialNo + 1);
            int insertItemSub = itemMapper.addItemSub(itemCommonCode, insertSerialNo, "WH");
            System.out.println("insertItemSub = " + insertItemSub);
        }
            // 회수 입고 , 품목상세에서 현재 위치 변경 , 입출내역에 추가
        else if(instk.getInputCommonCode().equals("RETRN")) {
            //현재 위치 창고로 변경
            itemMapper.updateCurrentCommonCodeBySerialNo();
            


        }
    }
}

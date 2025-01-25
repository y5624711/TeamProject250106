package com.example.backend.service.state.instk;

import com.example.backend.dto.state.instk.Instk;
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
//    public List<Instk> viewlist() {
//
//         List<Instk> instkList = mapper.viewBuyInList();
//
//        return  instkList;
//
//    }

    public Instk detailView(int inputKey) {


        //시리얼 번호 목록 
        List<Integer> serialList = mapper.getSerialNoByInputKey(inputKey);

        System.out.println("serialList = " + serialList);
        //  입고시 비고내용
        String inputStockNote = mapper.getInstkNoteByInputKey(inputKey, serialList.get(0));


//
        System.out.println("inputStockNote = " + inputStockNote);

        Instk instk = new Instk();
        instk.setInputNote(inputStockNote);
        instk.setSerialList(serialList);
        System.out.println("instk = " + instk);
        return instk;

    }
}

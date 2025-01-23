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
    public List<Instk> viewlist() {

         List<Instk> instkList = mapper.viewBuyInList();

        return  instkList;

    }

    public Instk detailView(int inputKey) {

       List<Integer> serialList= mapper.getSerialNoByInputKey(inputKey);

        System.out.println("serialList = " + serialList);
         String inputStockNote= mapper.getInstkNoteByInputKey(inputKey,serialList.get(0));


//         이거 애초에 분리해야하네
        System.out.println("inputStockNote = " + inputStockNote);

      Instk instk = new Instk();
      instk.setInputNote(inputStockNote);
      instk.setSerialList(serialList);
      return instk;

    }
}

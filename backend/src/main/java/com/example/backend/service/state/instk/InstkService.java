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
}

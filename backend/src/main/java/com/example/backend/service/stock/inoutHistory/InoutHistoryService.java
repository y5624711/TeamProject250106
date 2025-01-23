package com.example.backend.service.stock.inoutHistory;

import com.example.backend.dto.stock.inoutHistory.InoutHistory;
import com.example.backend.mapper.stock.inoutHistory.InoutHistoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InoutHistoryService {

    final InoutHistoryMapper mapper;

    public Map<String, Object> list() {
        List<InoutHistory> list = mapper.list();

        return Map.of("list", list);
    }

    public void add(InoutHistory InoutHistory) {
        mapper.add(InoutHistory);
    }

    public InoutHistory view(Integer inoutHistoryKey) {
        return mapper.view(inoutHistoryKey);
    }
}

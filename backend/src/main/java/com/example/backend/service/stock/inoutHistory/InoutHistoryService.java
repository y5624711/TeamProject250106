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

    public Map<String, Object> list(Integer page, String searchKeyword, String searchType) {

        Integer pageList = (page - 1) * 10;
        List<InoutHistory> list = mapper.list(pageList, searchKeyword, searchType);
        Integer count = mapper.count(searchKeyword, searchType);
        System.out.println(count);

        return Map.of("list", list, "count", count);
    }

    public void add(InoutHistory InoutHistory) {
        mapper.add(InoutHistory);
    }

    public InoutHistory view(Integer inoutHistoryKey) {
        return mapper.view(inoutHistoryKey);
    }
}

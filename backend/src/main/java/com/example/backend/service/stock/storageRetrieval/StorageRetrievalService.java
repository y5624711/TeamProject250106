package com.example.backend.service.stock.storageRetrieval;

import com.example.backend.dto.stock.storageRetrieval.StorageRetrieval;
import com.example.backend.mapper.stock.storageRetrieval.StorageRetrievalMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StorageRetrievalService {

    final StorageRetrievalMapper mapper;

    public Map<String, Object> list() {
        List<StorageRetrieval> list = mapper.list();

        return Map.of("list", list);
    }

    public void add(StorageRetrieval storageRetrieval) {
        mapper.add(storageRetrieval);
    }
}

package com.example.backend.controller.stock.storageRetrieval;

import com.example.backend.dto.stock.storageRetrieval.StorageRetrieval;
import com.example.backend.service.stock.storageRetrieval.StorageRetrievalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/storageRetrieval")
@RequiredArgsConstructor
public class StorageRetrievalController {

    final StorageRetrievalService service;

    @GetMapping("list")
    public Map<String, Object> list() {
        return service.list();
    }

    @PostMapping("add")
    public void add(@RequestBody StorageRetrieval storageRetrieval) {
        service.add(storageRetrieval);
    }
}

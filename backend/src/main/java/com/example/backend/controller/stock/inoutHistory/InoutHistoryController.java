package com.example.backend.controller.stock.inoutHistory;

import com.example.backend.dto.stock.inoutHistory.InoutHistory;
import com.example.backend.service.stock.inoutHistory.InoutHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/inoutHistory")
@RequiredArgsConstructor
public class InoutHistoryController {

    final InoutHistoryService service;

    @GetMapping("list")
    public Map<String, Object> list() {
        return service.list();
    }

    @PostMapping("add")
    public void add(@RequestBody InoutHistory InoutHistory) {
        service.add(InoutHistory);
    }

    @GetMapping("view/{inoutHistoryKey}")
    public InoutHistory view(@PathVariable Integer inoutHistoryKey) {
        System.out.println(inoutHistoryKey);
        return service.view(inoutHistoryKey);
    }
}

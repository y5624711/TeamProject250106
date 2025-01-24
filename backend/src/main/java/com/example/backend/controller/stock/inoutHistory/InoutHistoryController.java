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
    public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                    @RequestParam(value = "type", defaultValue = "all") String searchType,
                                    @RequestParam(value = "keyword", defaultValue = "") String searchKeyword) {
        return service.list(page, searchKeyword, searchType);
    }

    @PostMapping("add")
    public void add(@RequestBody InoutHistory InoutHistory) {
        service.add(InoutHistory);
    }

    @GetMapping("view/{inoutHistoryKey}")
    public InoutHistory view(@PathVariable Integer inoutHistoryKey) {
        return service.view(inoutHistoryKey);
    }

    @PostMapping("addhistory")
    public void addhistoty(@RequestBody InoutHistory InoutHistory) {
        System.out.println("까꿍");
    }
}

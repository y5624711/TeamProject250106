package com.example.backend.controller.standard.location;


import com.example.backend.dto.standard.location.Location;
import com.example.backend.service.standard.location.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    final LocationService service;

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                    @RequestParam(value = "type", defaultValue = "all") String searchType,
                                    @RequestParam(value = "keyword", defaultValue = "") String searchKeyword,
                                    @RequestParam(value = "sort", defaultValue = "") String sort,
                                    @RequestParam(value = "order", defaultValue = "") String order) {
        System.out.println(searchKeyword);
        return service.list(searchType, searchKeyword, page, sort, order);
    }

    @PostMapping("add")
    public void add(@RequestBody Location location) {
        service.add(location);
    }

    @GetMapping("view/{locationKey}")
    public Location view(@PathVariable Integer locationKey) {
        return service.view(locationKey);
    }

    @PutMapping("edit")
    public void edit(@RequestBody Location location) {
        service.edit(location);
    }

}

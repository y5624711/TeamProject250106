package com.example.backend.controller.standard.location;


import com.example.backend.dto.standard.location.Location;
import com.example.backend.service.standard.location.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    final LocationService service;

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(value = "type", defaultValue = "all") String searchType,
                                    @RequestParam(value = "keyword", defaultValue = "") String searchKeyword) {
        return service.list(searchType, searchKeyword);
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

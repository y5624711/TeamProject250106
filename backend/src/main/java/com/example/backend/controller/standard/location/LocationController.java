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
    public Map<String, Object> list() {
        return service.list();
    }

    @PostMapping("add")
    public void add(@RequestBody Location location) {
        service.add(location);
    }
}

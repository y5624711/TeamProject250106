package com.example.backend.service.standard.location;

import com.example.backend.dto.standard.location.Location;
import com.example.backend.mapper.standard.location.LocationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class LocationService {

    final LocationMapper mapper;

    public Map<String, Object> list(String searchType, String searchKeyword, Integer page, String sort, String order) {

        Integer pageList = (page - 1) * 10;
        List<Location> list = mapper.list(searchType, searchKeyword, pageList, sort, order);
        Integer countLocation = mapper.countAllLocation(searchType, searchKeyword);

        return Map.of("list", list, "count", countLocation);
    }

    public void add(Location location) {
        mapper.add(location);
    }

    public Location view(Integer locationKey) {
        return mapper.view(locationKey);
    }

    public void edit(Location location) {
        mapper.edit(location);
    }
}

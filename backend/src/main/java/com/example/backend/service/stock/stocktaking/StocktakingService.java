package com.example.backend.service.stock.stocktaking;

import com.example.backend.mapper.stock.stocktaking.StocktakingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StocktakingService {

    final StocktakingMapper mapper;
}

package com.example.backend.service.state.retrieve;

import com.example.backend.mapper.state.retrieve.ReturnMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReturnService {
    final ReturnMapper mapper;

}

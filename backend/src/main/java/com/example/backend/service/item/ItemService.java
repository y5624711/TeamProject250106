package com.example.backend.service.item;

import com.example.backend.dto.item.Item;
import com.example.backend.mapper.item.ItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    final ItemMapper mapper;

    // 물품 정보가 다 입력됐는지 확인
    public boolean validate(Item item) {
        return !(item.getItemCode() == null || item.getItemCode().trim().isEmpty() ||
                item.getItemType() == null || item.getItemType().trim().isEmpty() ||
                item.getManagerId() == null || item.getManagerId() < 0 ||
                item.getName() == null || item.getName().trim().isEmpty() ||
                item.getSize() == null || item.getSize().trim().isEmpty() ||
                item.getUnit() == null || item.getUnit().trim().isEmpty() ||
                item.getInPrice() == null || item.getInPrice() < 0 ||
                item.getOutPrice() == null || item.getOutPrice() < 0 ||
                item.getTax() == null || item.getTax() < 0 ||
                item.getMinimumStock() == null || item.getMinimumStock() < 0 ||
                item.getNote() == null || item.getNote().trim().isEmpty());
    }

    // 물품 추가하기
    public boolean addItem(Item item) {
        item.setPartnerId(1);
        item.setCommonCode("I");
        item.setActive(true);

        System.out.println(item.getItemCode());
        int cnt = mapper.addItem(item);

        return cnt == 1;
    }
}


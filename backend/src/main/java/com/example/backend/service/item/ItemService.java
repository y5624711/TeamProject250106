package com.example.backend.service.item;

import com.example.backend.dto.item.Item;
import com.example.backend.mapper.item.ItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    final ItemMapper mapper;

    // 물품 정보가 다 입력됐는지 확인
    public boolean validate(Item item) {
        return !(
                item.getItemCode() == null || item.getItemCode().trim().isEmpty() ||
                        item.getItemName() == null || item.getItemName().trim().isEmpty() ||
                        item.getPartnerName() == null || item.getPartnerName().trim().isEmpty() ||
                        item.getManagerName() == null || item.getManagerName().trim().isEmpty() ||
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
        // 협력업체명을 통해 협력업체 코드 가져오기
        item.setPartnerId(1);
        // 담당자명을 통해 담당자 코드 가져오기
        item.setManagerId(2);

        int cnt = mapper.addItem(item);

        return cnt == 1;
    }

    // 물품 구분 코드 가져오기
    public List<Map<String, String>> getItemCommonCode() {
        return mapper.getItemCommonCode();
    }

    // 물품 리스트 가져오기
    public List<Item> getItemList() {
        return mapper.getItemList();
    }

    // 물품 1개 정보 가져오기
    public List<Item> getItemView(int itemId) {
        return mapper.getItemView();
    }
}


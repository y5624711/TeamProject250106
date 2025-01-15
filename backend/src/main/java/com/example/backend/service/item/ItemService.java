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
                item.getItemCommonCode() == null || item.getItemCommonCode().trim().isEmpty() ||
                        item.getCustomerCode() == null || item.getCustomerCode().trim().isEmpty() ||
                        item.getSize() == null || item.getSize().trim().isEmpty() ||
                        item.getUnit() == null || item.getUnit().trim().isEmpty() ||
                        item.getInputPrice() == null || item.getInputPrice() < 0 ||
                        item.getOutputPrice() == null || item.getOutputPrice() < 0 ||
                        item.getItemNote() == null || item.getItemNote().trim().isEmpty());
    }

    // 물품 추가하기
    public boolean addItem(Item item) {
        int cnt = mapper.addItem(item);

        return cnt == 1;
    }

    // 물품 구분 코드 가져오기
    public List<Map<String, String>> getItemCommonCode() {
        return mapper.getItemCommonCode();
    }

    // 물품을 취급하는 협력업체 이름 가져오기
    public List<Item> getCustomerName(String itemCommonCode) {
        return mapper.getCustomerName(itemCommonCode);
    }

    // 물품 리스트 가져오기
    public List<Item> getItemList() {
        return mapper.getItemList();
    }

    // 물품 1개 정보 가져오기
    public List<Item> getItemView(int itemKey) {
        return mapper.getItemView(itemKey);
    }

    // 물품 삭제하기
    public boolean deleteItem(int itemKey) {
        int cnt = mapper.deleteItem(itemKey);
        return cnt == 1;
    }

    // 물품 수정하기
    public boolean editItem(int itemKey, Item item) {
        int cnt = mapper.editItem(itemKey, item);
        System.out.println(item);
        return cnt == 1;
    }
}


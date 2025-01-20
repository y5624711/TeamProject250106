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

    // 품목 정보가 다 입력됐는지 확인
    public boolean validate(Item item) {
        return !(
                item.getItemCommonCode() == null || item.getItemCommonCode().trim().isEmpty() ||
                        item.getCustomerCode() == null || item.getCustomerCode().trim().isEmpty() ||
                        item.getInputPrice() == null || item.getInputPrice() < 0 ||
                        item.getOutputPrice() == null || item.getOutputPrice() < 0);
    }

    // 품목 중복 검증
    public boolean duplicate(String itemCommonCode) {
        List<String> itemList = mapper.getUsedItemCommonCode();
        return itemList.contains(itemCommonCode);
    }

    // 품목 추가하기
    public boolean addItem(Item item) {
        int cnt = mapper.addItem(item);
        return cnt == 1;
    }

    // 품목 구분 코드 가져오기
    public List<Map<String, String>> getItemCommonCode() {
        return mapper.getItemCommonCode();
    }

    // 품목을 취급하는 협력업체 이름 가져오기
    public List<Item> getCustomerName(String itemCommonCode) {
        return mapper.getCustomerName(itemCommonCode);
    }


    // 품목 리스트 가져오기
    public Map<String, Object> getItemList(Integer page, Boolean active, String type, String keyword, String sort, String order) {
        // LIMIT 키워드에서 사용되는 offset
        Integer offset = (page - 1) * 10;
        type = resolveType(toSnakeCase(type));
        sort = resolveType(toSnakeCase(sort));

        return Map.of("list", mapper.getItemList(offset, active, type, keyword, sort, order),
                "count", mapper.countAll(active, type, keyword));
    }

    // camelCase를 snake_case로 변환하는 로직
    private String toSnakeCase(String camelCase) {
        if (camelCase == null || camelCase.isEmpty()) {
            return camelCase; // null 이거나 빈 문자열은 그대로 반환
        }
        return camelCase
                .replaceAll("([a-z])([A-Z])", "$1_$2") // 소문자 뒤 대문자에 언더스코어 추가
                .toLowerCase(); // 전체를 소문자로 변환
    }

    // type 값에 따라 해당하는 SQL 필드명으로 변경
    private String resolveType(String type) {
        if (type == null || type.isEmpty() || type.equals("all")) {
            return "all";
        }
        switch (type) {
            case "item_key":
                return "i.item_key";
            case "unit":
                return "i.unit";
            case "size":
                return "i.size";
            case "item_common_name":
                return "ic.item_common_name";
            case "customer_name":
                return "c.customer_name";
            case "input_price":
                return "i.input_price";
            case "output_price":
                return "i.output_price";
            case "item_active":
                return "i.item_active";
            default:
                throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

    // 품목 1개 정보 가져오기
    public List<Item> getItemView(int itemKey) {
        return mapper.getItemView(itemKey);
    }

    // 이미 삭제된 품목인지 검증
    public boolean deletedItem(int itemKey) {
        List<Integer> deletedItemList = mapper.deletedItem();
        return deletedItemList.contains(itemKey);
    }


    // 품목 삭제하기
    public boolean deleteItem(int itemKey) {
        int cnt = mapper.deleteItem(itemKey);
        return cnt == 1;
    }

    // 품목 수정하기
    public boolean editItem(int itemKey, Item item) {
        int cnt = mapper.editItem(itemKey, item);
        return cnt == 1;
    }
}


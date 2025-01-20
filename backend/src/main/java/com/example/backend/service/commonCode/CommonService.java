package com.example.backend.service.commonCode;

import com.example.backend.dto.commonCode.CommonCode;
import com.example.backend.dto.commonCode.ItemCommonCode;
import com.example.backend.mapper.commonCode.CommonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class CommonService {
    final CommonMapper mapper;

    //값이 입력되었는지 체크
    public boolean validate(CommonCode commonCode) {
        boolean common_code = !commonCode.getCommonCode().trim().isEmpty();
        boolean common_name = !commonCode.getCommonCodeName().trim().isEmpty();

        return common_code && common_name;
    }

    public Map<String, Object> selectSystemCommonCodeList(Integer page,
                                                          String type,
                                                          String keyword,
                                                          String sort,
                                                          String order,
                                                          Boolean active) {
        int offset = (page - 1) * 10;


        return Map.of("list", mapper.getSysCommonCodeList(offset, type, keyword, sort, order, active),
                "count", mapper.countAllSysCommonCode(active, type, keyword));
    }


    public boolean addCommonCode(CommonCode commonCode) {
        int cnt = mapper.insertCommonCode(commonCode);
        return cnt == 1;
    }

    // 품목 공통 코드 조회
    public Map<String, Object> getItemCommonCodeList(Integer page, Boolean active, String sort, String order, String type, String keyword) {
        Integer offset = (page - 1) * 10;
        type = toSnakeCase(type);
        sort = toSnakeCase(sort);
        return Map.of("list", mapper.getItemCommonCodeList(offset, active, sort, order, type, keyword),
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


    // 품목 공통 코드 정보 입력됐는지 확인
    public boolean validateItemCommonCode(ItemCommonCode itemCommonCode) {
        // 품목 코드가 null이 아니고, 공백이 아니며, 영문 대문자 3자리로 되어있는지 검증
        boolean isValidItemCommonCode = itemCommonCode.getItemCommonCode() != null &&
                !itemCommonCode.getItemCommonCode().trim().isEmpty() &&
                itemCommonCode.getItemCommonCode().matches("^[A-Z]{3}$");

        // 품목명도 null이 아니고, 공백이 아닌지 확인
        boolean isValidItemCommonName = itemCommonCode.getItemCommonName() != null &&
                !itemCommonCode.getItemCommonName().trim().isEmpty();

        return isValidItemCommonCode && isValidItemCommonName;
    }

    // 품목 공통 코드 중복 화인
    public boolean duplicateItemCommonCode(String itemCommonCode, String itemCommonName) {
        int count = mapper.countByCodeOrName(itemCommonCode, itemCommonName);
        return count > 0;
    }

    // 품목 공통 코드 추가
    public boolean addItemCommonCode(ItemCommonCode itemCommonCode) {
        int cnt = mapper.addItemCommonCode(itemCommonCode);
        return cnt == 1;
    }

    // 품목 공통 코드 1개 정보 가져오기
    public List<ItemCommonCode> getItemCommonCodeView(int itemCommonCodeKey) {
        return mapper.getItemCommonCodeView(itemCommonCodeKey);
    }

    // 삭제된 품목 공통 코드인지 확인
    public boolean deletedItemCommonCode(int itemCommonCodeKey) {
        List<Integer> deletedItemCommonCodeList = mapper.deletedItemCommonCode();
        return deletedItemCommonCodeList.contains(itemCommonCodeKey);
    }

    // 품목 공통 코드 삭제하기
    public boolean deleteItemCommonCode(int itemCommonCodeKey) {
        int cnt = mapper.deleteItemCommonCode(itemCommonCodeKey);
        return cnt == 1;
    }

    // 품목 공통 코드 수정하기
    public boolean editItemCommonCode(int itemCommonCodeKey, ItemCommonCode itemCommonCode) {
        int cnt = mapper.editItemCommonCode(itemCommonCodeKey, itemCommonCode);
        return cnt == 1;
    }

    public boolean validateSysCode(CommonCode commonCode) {
        Boolean name = !commonCode.getCommonCodeName().trim().isEmpty();
        Boolean code = !commonCode.getCommonCode().trim().isEmpty();

        return name && code;
    }

    public boolean updateSysCode(CommonCode commonCode) {
        int cnt = mapper.updateSysCode(commonCode);
        return cnt == 1;
    }

    public boolean deleteSysCommonCode(Integer commonCodeKey) {
        int cnt = mapper.deleteSysCode(commonCodeKey);
        return cnt == 1;
    }

    public boolean reUseSysCommonCode(Integer commonCodeKey) {
        int cnt = mapper.reUseSysCode(commonCodeKey);
        return cnt == 1;
    }

    public boolean checkSameName(CommonCode commonCode) {
        int cnt = mapper.checkSameName(commonCode.getCommonCode(), commonCode.getCommonCodeName());

        return cnt == 0;
    }
}

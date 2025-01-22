package com.example.backend.service.standard.commonCode;

import com.example.backend.dto.standard.commonCode.CommonCode;
import com.example.backend.mapper.standard.commonCode.CommonMapper;
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

    // 품목 공통 코드 조회
    public Map<String, Object> getCommonCodeList(Integer page, Boolean active, String sort, String order, String type, String keyword) {
        Integer offset = (page - 1) * 10;
        type = toSnakeCase(type);
        sort = toSnakeCase(sort);
        return Map.of("list", mapper.getCommonCodeList(offset, active, sort, order, type, keyword),
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
    public boolean validateCommonCode(CommonCode commonCode) {
        // 품목 코드가 null이 아니고, 공백이 아니며, 영문 대문자 3자리로 되어있는지 검증
        boolean isValidCommonCode = commonCode.getCommonCode() != null &&
                !commonCode.getCommonCode().trim().isEmpty() &&
                commonCode.getCommonCode().matches("^[A-Z]{3}$");

        // 품목명도 null이 아니고, 공백이 아닌지 확인
        boolean isValidCommonName = commonCode.getCommonCodeName() != null &&
                !commonCode.getCommonCodeName().trim().isEmpty();

        return isValidCommonCode && isValidCommonName;
    }

    // 품목 공통 코드 중복 화인
    public boolean duplicateCommonCode(String commonCode, String CommonName) {
        int count = mapper.countByCodeOrName(commonCode, CommonName);
        return count > 0;
    }

    // 품목 공통 코드 추가
    public boolean addCommonCode(CommonCode commonCode) {
        int cnt = mapper.addCommonCode(commonCode);
        return cnt == 1;
    }

    // 품목 공통 코드 1개 정보 가져오기
    public List<CommonCode> getCommonCodeView(int commonCodeKey) {
        return mapper.getCommonCodeView(commonCodeKey);
    }

    // 삭제된 품목 공통 코드인지 확인
    public boolean deletedCommonCode(int commonCodeKey) {
        List<Integer> deletedCommonCodeList = mapper.deletedCommonCode();
        return deletedCommonCodeList.contains(commonCodeKey);
    }

    // 품목 공통 코드 삭제하기
    public boolean deleteCommonCode(int commonCodeKey) {
        int cnt = mapper.deleteCommonCode(commonCodeKey);
        return cnt == 1;
    }

    // 품목 공통 코드 수정하기
    public boolean editCommonCode(int commonCodeKey, CommonCode commonCode) {
        int cnt = mapper.editCommonCode(commonCodeKey, commonCode);
        return cnt == 1;
    }


}

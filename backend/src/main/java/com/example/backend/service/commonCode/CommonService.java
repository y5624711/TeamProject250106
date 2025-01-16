package com.example.backend.service.commonCode;

import com.example.backend.dto.commonCode.CommonCode;
import com.example.backend.dto.commonCode.ItemCommonCode;
import com.example.backend.mapper.commonCode.CommonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommonService {
    final CommonMapper mapper;

    public List<CommonCode> selectAllList() {
        return mapper.selectAll();
    }

    //값이 입력되었는지 체크
    public boolean validate(CommonCode commonCode) {
        boolean common_code = !commonCode.getCommon_code().trim().isEmpty();
        boolean common_name = !commonCode.getCommon_code_name().trim().isEmpty();

        return common_code && common_name;
    }

    public boolean addCommonCode(CommonCode commonCode) {
        int cnt = mapper.insertCommonCode(commonCode);
        return cnt == 1;
    }


    // 물품 공통 코드 조회
    public List<ItemCommonCode> getItemCommonCodeList() {
        return mapper.getItemCommonCodeList();
    }

    // 물품 공통 코드 정보 입력됐는지 확인
    public boolean validateItemCommonCode(ItemCommonCode itemCommonCode) {
        return !(
                itemCommonCode.getItemCommonCode() == null || itemCommonCode.getItemCommonCode().trim().isEmpty() ||
                        itemCommonCode.getItemCommonName() == null || itemCommonCode.getItemCommonName().trim().isEmpty());
    }

    // 물품 공통 코드 중복 화인
    public boolean duplicateItemCommonCode(String itemCommonCode) {
        List<String> itemCommonCodeList = mapper.getItemCommonCode();
        List<String> itemCommonNameList = mapper.getItemCommonName();
        return itemCommonCodeList.contains(itemCommonCode) || itemCommonNameList.contains(itemCommonCode);
    }

    // 물품 공통 코드 추가
    public boolean addItemCommonCode(ItemCommonCode itemCommonCode) {
        int cnt = mapper.addItemCommonCode(itemCommonCode);
        return cnt == 1;
    }
}

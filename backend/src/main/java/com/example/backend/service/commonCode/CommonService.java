package com.example.backend.service.commonCode;

import com.example.backend.dto.commonCode.CommonCode;
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
        boolean common_name = !commonCode.getName().trim().isEmpty();

        return common_code && common_name;
    }

    public boolean addCommonCode(CommonCode commonCode) {
        int cnt = mapper.insertCommonCode(commonCode);
        return cnt == 1;
    }
}

package com.example.backend.mapper.member;


import com.example.backend.dto.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface MemberMapper {

    @Insert("""
        INSERT INTO member (member_id, password, common_code)
        VALUES (#{memberId}, #{password}, #{commonCode})
    """)
    @Options(useGeneratedKeys = true, keyProperty = "memberKey")
    int addMember(Member member);
}

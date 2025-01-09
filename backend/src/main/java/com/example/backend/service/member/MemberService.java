package com.example.backend.service.member;


import com.example.backend.dto.Member;
import com.example.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
        final MemberMapper mapper;
    public boolean addMember(Member member) {

           int cnt= mapper.addMember(member);

           return cnt==1;
    }
}

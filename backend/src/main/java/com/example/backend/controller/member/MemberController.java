package com.example.backend.controller.member;

import com.example.backend.dto.Member;
import com.example.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
     final MemberService service;


     @GetMapping("/list")  //  모든 멤버 출력
     public List<Member> getAllMembers() {

        List<Member> allList = service.getAllMembers();

        return allList;
     }

    @PostMapping("add")
    public void addMember(@RequestBody Member member) {
        System.out.println("member = " + member);
        service.addMember(member);
    }
}

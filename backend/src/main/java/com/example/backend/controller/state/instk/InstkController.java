package com.example.backend.controller.state.instk;

import com.example.backend.dto.state.instk.Instk;
import com.example.backend.service.state.instk.InstkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/instk")
public class InstkController {

     final InstkService service;

    @GetMapping("list")
    public List<Instk> viewlist (){
        List<Instk> list = service.viewlist();
        System.out.println("list = " + list);
        return list;

    }


}

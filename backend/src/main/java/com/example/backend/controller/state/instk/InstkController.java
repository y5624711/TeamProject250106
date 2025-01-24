package com.example.backend.controller.state.instk;

import com.example.backend.dto.state.instk.Instk;
import com.example.backend.service.state.instk.InstkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/instk")
public class InstkController {

    final InstkService service;

    @GetMapping("list")
    public List<Instk> viewlist() {
        List<Instk> list = service.viewlist();
//        System.out.println("list = " + list);
        return list;

    }

    @PostMapping("add")
    public void add(@RequestBody Instk instk) {
        // 인풋 키만 있으면 됨
        System.out.println("instk = " + instk);

        service.sibal(instk);

    }

    @GetMapping("detailview/{inputKey}")
    public Instk detailView(@PathVariable int inputKey) {
//        System.out.println("inputKey = " + inputKey);

        return service.detailView(inputKey);

    }


}

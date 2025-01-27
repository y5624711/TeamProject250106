package com.example.backend.controller.state.instk;

import com.example.backend.dto.state.instk.Instk;
import com.example.backend.dto.state.instk.InstkDetail;
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

        System.out.println("instk = " + instk);

        service.addInstkProcess(instk);

    }

    //승인 상세
    @GetMapping("detailView/{inputKey}")
    public Instk detailView(@PathVariable int inputKey) {
        System.out.println("inputKey = " + inputKey);


//        return  new Instk();
        return service.detailView(inputKey);

    }
    //확인 상세
    @GetMapping("confirmView/{inputNo}")
    public InstkDetail confirmView(@PathVariable String inputNo , @RequestParam String inputCommonCode) {


        return service.confirmView(inputNo,inputCommonCode);



    }


}

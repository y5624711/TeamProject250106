package com.example.backend.controller.state.instk;

import com.example.backend.dto.state.instk.Instk;
import com.example.backend.dto.state.instk.InstkDetail;
import com.example.backend.service.state.instk.InstkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/instk")
public class InstkController {

    final InstkService service;

    @GetMapping("list")
    public Map<String,Object> viewlist(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "state", defaultValue = "all") String state,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "order", defaultValue = "DESC") String order,
            Authentication authentication
    ) {
        Map<String,Object> returnlist = service.viewlist(state,page,keyword,sort,order,type ,authentication);
        return returnlist;

    }

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>>  add(@RequestBody Instk instk ,Authentication authentication) {
        
        //권한 확인
        if( !service.authorityCheck(authentication,instk.getCustomerName()) ){
            return  ResponseEntity.status(401)
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", "등록 권한이 없습니다.")));

        };


        boolean success = service.addInstkProcess(instk);

        if(success){
            return  ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{instk.getInputKey()}번 승인 처리  했습니다.")));
        }else {
            return  ResponseEntity.status(401)
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", STR."\{instk.getInputKey()}번 승인 실패  했습니다.")));
        }
    }

    //승인 상세
    @GetMapping("detailview/{inputKey}")
    public Instk detailView(@PathVariable int inputKey ,@RequestParam String inputCommonCodeName ,@RequestParam boolean inputConsent  ) {

        return service.detailView(inputKey,inputCommonCodeName,inputConsent);

    }
    //확인 상세
    @GetMapping("confirmView/{inputNo}")
    public InstkDetail confirmView(@PathVariable String inputNo , @RequestParam String inputCommonCode) {

        return service.confirmView(inputNo,inputCommonCode);

    }
    //reject
    @PutMapping("reject")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> rejectInstk(@RequestBody Instk instk ,Authentication authentication) {

        //권한 확인
        if( !service.authorityCheck(authentication,instk.getCustomerName()) ){
            return  ResponseEntity.status(401)
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", "반려 권한이 없습니다.")));

        };

        boolean result = service.rejectInstk(instk);

        // 이미 반려된 상태
//        if (result) {
//            return ResponseEntity.ok()
//                    .body(Map.of("message", Map.of("type", "error",
//                            "text", STR."\{instk.getInputKey()} 이미 반려된 주문입니다.")));
//        }
        // 반려 성공
         if (result) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{instk.getInputKey()}번 주문 반려 되었습니다.")));
        }
        // 실패
        else {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", STR."\{instk.getInputKey()}번 주문 반려 실패했습니다.")));
        }

    }


}

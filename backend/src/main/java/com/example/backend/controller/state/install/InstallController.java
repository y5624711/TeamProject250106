package com.example.backend.controller.state.install;

import com.example.backend.dto.state.install.Install;
import com.example.backend.service.state.install.InstallService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/install")
public class InstallController {

    final InstallService service;

    // 설치 요청에 대한 정보 가져오기
    @GetMapping("/request/{installKey}")
    public List<Install> getInstallRequestView(@PathVariable int installKey) {
        return service.getInstallRequestView(installKey);
    }

    // 설치 요청 테이블에서 요청 리스트 가져오기
    @GetMapping("list/request")
    public List<Install> getInstallRequestList() {
        return service.getInstallRequestList();
    }

    // 설치 가능한 품목명, 품목 코드 가져오기
    @GetMapping("commonCode")
    public List<Map<String, String>> getInstallItemList() {
        return service.getInstallItemList();
    }

    // 설치 요청
    @PostMapping("request")
    public ResponseEntity<Map<String, Object>> installRequest(@RequestBody Install install) {
        if (service.installRequest(install)) {
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "success",
                            "text", "설치 요청이 등록되었습니다."),
                    "data", install
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "설치 요청이 실패하였습니다.")
            ));
        }
    }
}

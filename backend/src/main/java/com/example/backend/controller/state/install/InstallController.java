package com.example.backend.controller.state.install;

import com.example.backend.dto.state.install.Install;
import com.example.backend.service.state.install.InstallService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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

    // 설치 확인
    @PostMapping("configuration")
    public ResponseEntity<Map<String, Object>> installConfiguration(@RequestBody Install install) {
        // 비고 추가, 검수 테이블에 추가
        if (service.installConfiguration(install)) {
            // 설치가 성공하면 품목 입출력 테이블에 추가 작업 수행
            if (service.addOutHistory(install)) {
                return ResponseEntity.ok().body(Map.of(
                        "message", Map.of("type", "success", "text", "설치 확인 및 품목 입출력 테이블에 추가되었습니다."),
                        "data", install
                ));
            } else {
                return ResponseEntity.internalServerError().body(Map.of(
                        "message", Map.of("type", "error", "text", "품목 입출력 테이블에 추가 실패하였습니다.")
                ));
            }
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "설치 확인이 실패하였습니다.")
            ));
        }
    }

    // 설치 승인에 대한 정보 가져오기
    @GetMapping("/approve/{installKey}")
    public ResponseEntity<?> getInstallApproveView(@PathVariable int installKey) {
        try {
            Install install = service.getInstallApproveView(installKey);
            if (install != null) {
                return ResponseEntity.ok(install);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "설치 데이터를 찾을 수 없습니다."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "설치 데이터를 가져오는 중 오류가 발생했습니다.", "error", e.getMessage()));
        }
    }


    // 설치 승인 테이블에서 요청 리스트 가져오기
    @GetMapping("list/approve")
    public List<Install> getInstallApproveList() {
        return service.getInstallApproveList();
    }

    // 설치 승인
    @PostMapping("approve")
    public ResponseEntity<Map<String, Object>> installApprove(@RequestBody Install install) {
        if (service.installApprove(install)) {
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "success",
                            "text", "설치 승인되었습니다."),
                    "data", install
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "설치 승인이 실패하였습니다.")
            ));
        }
    }

    // 설치 기사 사번으로 이름 가져오기
    @GetMapping("{customerInstallerNo}")
    public String getCustomerInstaller(@PathVariable String customerInstallerNo) {
        return service.getCustomerInstaller(customerInstallerNo);
    }

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

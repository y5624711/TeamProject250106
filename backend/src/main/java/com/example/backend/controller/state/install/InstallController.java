package com.example.backend.controller.state.install;

import com.example.backend.dto.state.install.Install;
import com.example.backend.service.state.install.InstallService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/install")
public class InstallController {

    final InstallService service;

    // 설치 요청 반려
    @PostMapping("disapprove/{installKey}")
    public ResponseEntity<Map<String, Object>> installDisapprove(@PathVariable int installKey) {
        // 설치가 성공하면 품목 입출력 테이블에 추가 작업 수행
        if (service.installDisapprove(installKey)) {
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "success", "text", "설치 요청이 반려되었습니다.")
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "설치 요청 반려를 실패하였습니다.")
            ));
        }
    }


    // 설치 요청, 승인 리스트 가져오기
    @GetMapping("list")
    public Map<String, Object> getInstallList(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "order", defaultValue = "") String order,
            @RequestParam(value = "state", defaultValue = "") String state,
            @RequestParam(value = "type", defaultValue = "") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword) {
        return service.getInstallList(page, sort, order, state, type, keyword);
    }

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
                    "message", Map.of("type", "error", "text", "설치 완료가 실패하였습니다.")
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

    // 설치 승인
    @PostMapping("approve")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> installApprove(@RequestBody Install install) {
        if (service.approveValidate(install)) {
            if (service.installApprove(install)) {
                return ResponseEntity.ok().body(Map.of(
                        "message", Map.of("type", "success",
                                "text", "설치 승인되었습니다."),
                        "data", install));
            } else {
                return ResponseEntity.internalServerError().body(Map.of(
                        "message", Map.of("type", "error", "text", "설치 승인이 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "설치 예정일, 설치 기사, 사번이 입력되지 않았습니다.")));
        }
    }

    // 설치 기사 정보 가져오기
    @GetMapping("customerEmployee/{installKey}")
    public List<Map<String, Object>> getCustomerEmployee(@PathVariable int installKey) {
        return service.getCustomerEmployee(installKey);
    }

    // 설치 요청에 대한 정보 가져오기
    @GetMapping("/request/{installKey}")
    public List<Install> getInstallRequestView(@PathVariable int installKey) {
        return service.getInstallRequestView(installKey);
    }

    // 설치 가능한 품목명, 품목 코드 가져오기
    @GetMapping("commonCode")
    public List<Map<String, Object>> getInstallItemList() {
        return service.getInstallItemList();
    }

    // 설치 요청 가능한 가맹점, 가맹점 주소 가져오기
    @GetMapping("franchise")
    public List<Map<String, String>> getInstallFranchiseList() {
        return service.getInstallFranchiseList();
    }

    // 설치 요청
    @PostMapping("request")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> installRequest(@RequestBody Install install, Authentication authentication) {
        if (service.requestValidate(install)) {
            if (service.installRequest(install, authentication)) {
                return ResponseEntity.ok().body(Map.of(
                        "message", Map.of("type", "success",
                                "text", "설치 요청이 등록되었습니다."),
                        "data", install));
            } else {
                return ResponseEntity.internalServerError().body(Map.of(
                        "message", Map.of("type", "error", "text", "설치 요청이 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "상품명, 가격, 거래 장소가 입력되지 않았습니다.")));
        }
    }
}

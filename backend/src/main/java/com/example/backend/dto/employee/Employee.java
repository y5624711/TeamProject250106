package com.example.backend.dto.employee;

import lombok.Data;

@Data
public class Employee {
    private int employeeKey;
    private String employeeCommonCode;
    private String employeeWorkPlaceCode;
    private String employeeWorkPlaceName;
    private String employeeNo;
    private String employeePassword;
    private String employeeName;
    private String employeeTel;
    private String employeeWorkPlaceTel;
    private String employeeNote;
    private boolean employeeActive;



    
    public static String correctCommonCode(String commonCode) {
        switch (commonCode) {
            case "기본키":
                return "employee_key";
            case "공통구부":
                return "employee_common_code";
            case "소속구분":
                return "employee_workplace_code";
            case "기업명":
                return "employee_company_name";
            case "부서명":
                return "employee_department_name";
            case "직원명":
                return "employee_name";
            case "사번":
                return "employee_no";
            case "계약여부":
                return "employee_active";
            default:
                return "all";
        }
    }
}





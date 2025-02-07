package com.example.backend.dto.standard.employee;

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
    private String departmentName;
    private boolean employeeActive;
    private String customerName;


    public static String correctCommonCode(String commonCode) {
        switch (commonCode) {
            case "기본키":
                return "employee_key";
            case "공통구분":
                return "employee_common_code";
            case "소속구분":
                return "employee_workplace_code";
            case "기업명":
                return "employee_workplace_name";
            case "기업번호":
                 return "employee_workplace_tel";
            case "부서명":
                return "department_name";
            case "부서번호":
                return "employee_workplace_tel";
            case "직원명":
                return "employee_name";
            case "직원번호":
                return "employee_tel";
            case "사번":
                return "employee_no";
            default:
                return "all";
        }
    }
    public static String correctType(String commonCode) {
        switch (commonCode) {
            case "소속구분":
                return "employee_workplace_code";
            case "기업명":
                return "employee_workplace_name";
            case "부서명":
                return "department_name";
            case "직원명":
                return "employee_name";
            case "사번":
                return "employee_no";
            default:
                return "all";
        }
    }
}





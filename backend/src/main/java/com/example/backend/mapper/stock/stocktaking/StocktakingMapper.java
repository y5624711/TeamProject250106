package com.example.backend.mapper.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StocktakingMapper {

    @Select("""
            SELECT s.stocktaking_key,
                                           s.item_code,
                                           s.warehouse_code,
                                           s.location_key,
                                           s.customer_employee_no,
                                           s.count_current,
                                           s.count_configuration,
                                           s.stocktaking_date,
                                           w.warehouse_name,
                                           w.customer_code,
                                           itcm.item_common_name itemName,
                        cus.customer_name,
            emp.employee_name customerEmployeeName
                                    FROM TB_STKTK s 
                                        LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
                            LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                                        LEFT JOIN TB_ITEMCOMM itcm ON s.item_code=itcm.item_common_code
                        LEFT JOIN TB_EMPMST emp ON s.customer_employee_no=emp.employee_no
            """)
    List<Stocktaking> list();

    @Select("""
                                    SELECT s.stocktaking_key,
                                           s.item_code,
                                           s.warehouse_code,
                                           s.location_key,
                                           s.customer_employee_no,
                                           s.count_current,
                                           s.count_configuration,
                                           s.stocktaking_date,
                                           w.warehouse_name,
                                           w.customer_code,
                                           itcm.item_common_name itemName,
                        cus.customer_name,
            emp.employee_name customerEmployeeName
                                    FROM TB_STKTK s 
                                        LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
                            LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                                        LEFT JOIN TB_ITEMCOMM itcm ON s.item_code=itcm.item_common_code
                        LEFT JOIN TB_EMPMST emp ON s.customer_employee_no=emp.employee_no
                                    WHERE stocktaking_key=#{stocktakingKey}
            """)
    Stocktaking view(Integer stocktakingKey);
}

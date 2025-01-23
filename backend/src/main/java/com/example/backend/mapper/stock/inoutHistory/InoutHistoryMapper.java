package com.example.backend.mapper.stock.inoutHistory;

import com.example.backend.dto.stock.inoutHistory.InoutHistory;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InoutHistoryMapper {

    @Select("""
                        SELECT h.inout_history_key,
                            h.serial_no,
                            h.warehouse_code,
                            h.inout_common_code,
                            h.customer_employee_no,
                            h.business_employee_no,
                            h.franchise_code,
                            h.location_key,
                            h.inout_history_date,
                            h.inout_history_note,
                            w.warehouse_name,
                            itsb.item_common_code itemCode,
                            itcm.item_common_name itemName,
                            fr.franchise_name,
                            cusemp.employee_name customerEmployeeName,
                            bizemp.employee_name businessEmployeeName,
                cus.customer_name
                        FROM TB_INOUT_HIS h
                             LEFT JOIN TB_WHMST w ON h.warehouse_code = w.warehouse_code
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                             LEFT JOIN TB_ITEMSUB itsb ON h.serial_no = itsb.serial_no
                             LEFT JOIN TB_ITEMCOMM itcm ON itsb.item_common_code = itcm.item_common_code
                             LEFT JOIN TB_FRNCHSMST fr ON h.franchise_code = fr.franchise_code
                             LEFT JOIN TB_EMPMST cusemp ON h.customer_employee_no = cusemp.employee_no
                             LEFT JOIN TB_EMPMST bizemp ON h.business_employee_no = bizemp.employee_no
            """)
    List<InoutHistory> list();

    @Insert("""
            INSERT INTO TB_INOUT_HIS()
            VALUES()
            """)
    int add(InoutHistory InoutHistory);

    @Select("""
            SELECT h.inout_history_key,
                h.serial_no,
                h.warehouse_code,
                h.inout_common_code,
                h.customer_employee_no,
                h.business_employee_no,
                h.franchise_code,
                h.location_key,
                h.inout_history_date,
                h.inout_history_note,
                w.warehouse_name,
                itsb.item_common_code itemCode,
                itcm.item_common_name itemName,
                fr.franchise_name,
                cusemp.employee_name customerEmployeeName,
                bizemp.employee_name businessEmployeeName
            FROM TB_INOUT_HIS h
                 LEFT JOIN TB_WHMST w ON h.warehouse_code = w.warehouse_code
                 LEFT JOIN TB_ITEMSUB itsb ON h.serial_no = itsb.serial_no
                 LEFT JOIN TB_ITEMCOMM itcm ON itsb.item_common_code = itcm.item_common_code
                 LEFT JOIN TB_FRNCHSMST fr ON h.franchise_code = fr.franchise_code
                 LEFT JOIN TB_EMPMST cusemp ON h.customer_employee_no = cusemp.employee_no
                 LEFT JOIN TB_EMPMST bizemp ON h.business_employee_no = bizemp.employee_no
            WHERE h.inout_history_key = ${inoutHistoryKey}
            """)
    InoutHistory view(Integer inoutHistoryKey);
}

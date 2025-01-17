import React, { useEffect, useState } from "react";
import axios from "axios";

function DepartmentInquiry(props) {
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    axios.get(`/api/department/list`).then((res) => {
      setDepartmentList(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <h1>인사 조회 {">"} 부서 조회</h1>
      <div>
        {departmentList.map((d) => (
          <ul>
            <li>{d.department_id}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default DepartmentInquiry;

import React, { useEffect } from "react";
import axios from "axios";

function DepartmentInquiry(props) {
  useEffect(() => {
    axios.get(`/api/department/list`).then((res) => {});
  }, []);

  return <div>하하</div>;
}

export default DepartmentInquiry;

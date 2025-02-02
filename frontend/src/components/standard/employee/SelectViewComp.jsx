import axios from "axios";
import { createListCollection } from "@chakra-ui/react";
import { CustomerSelect } from "./CustomerSelect.jsx";
import { EmployeeSelect } from "./EmployeeSelect.jsx";
import { useEffect, useState } from "react";

export function SelectViewComp({ formData, handleSelectChange }) {
  const checkCommonCode = formData.selectedCommonCode.value?.[0];
  const [codeList, setCodeList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("checkCommonCode:", checkCommonCode);
    setIsLoading(true);

    if (checkCommonCode === "CUS") {
      axios
        .get("api/customer/codenames")
        .then((res) => {
          const formattedList = createListCollection({
            items: res.data.map((item) => ({
              label: item.customerName,
              value: item.customerCode,
            })),
          });
          setCodeList(formattedList);
        })
        .finally(() => setIsLoading(false));
    } else if (checkCommonCode === "EMP") {
      axios
        .get("api/department/codenames")
        .then((res) => {
          const formattedList = createListCollection({
            items: res.data.map((item) => ({
              label: item.departmentName,
              value: item.departmentCode,
            })),
          });
          setCodeList(formattedList);
        })
        .finally(() => setIsLoading(false));
    }
  }, [formData.selectedCommonCode]);

  if (isLoading || !codeList) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {checkCommonCode === "CUS" && (
        <CustomerSelect
          frameworks={codeList}
          formData={formData}
          handleSelectChange={handleSelectChange}
        />
      )}
      {checkCommonCode === "EMP" && (
        <EmployeeSelect
          frameworks={codeList}
          formData={formData}
          handleSelectChange={handleSelectChange}
        />
      )}
    </>
  );
}

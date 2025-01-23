import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "../../ui/checkbox.jsx";

export function ActiveSwitch({ onActiveChange }) {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [active, setActive] = useState(() => {
    const checkActive = searchParams.get("active");
    return checkActive === "false";
  });

  const handleSwitchChange = () => {
    const newActive = !active;
    setActive(newActive); // 상태 변경

    // 부모 컴포넌트에 상태 전달
    onActiveChange(newActive);

    // URL 파라미터 갱신
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("active", newActive ? "false" : "true");
    nextSearchParams.set("page", "1");
    setSearchParams(nextSearchParams);
  };

  return (
    <Checkbox my={5} checked={!active} onChange={handleSwitchChange}>
      삭제된 정보 포함
    </Checkbox>
  );
}

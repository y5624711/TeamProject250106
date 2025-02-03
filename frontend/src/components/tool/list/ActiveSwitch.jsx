import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "../../ui/checkbox.jsx";

export function ActiveSwitch({ onActiveChange }) {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [active, setActive] = useState(searchParams.get("active") === "true");

  // URL 파라미터에 active 값이 있으면 해당 값에 따라 상태 변경
  useEffect(() => {
    const checkActive = searchParams.get("active");
    setActive(checkActive === "true"); // "true"일 때만 active 상태를 true로 설정
  }, [searchParams]);

  const handleSwitchChange = () => {
    const newActive = !active;
    setActive(newActive); // 상태 변경

    // 부모 컴포넌트에 상태 전달
    onActiveChange(newActive);

    // URL 파라미터 갱신
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("active", newActive ? "true" : "false");
    nextSearchParams.set("page", "1");
    setSearchParams(nextSearchParams);
  };

  return (
    <Checkbox
      mt={3}
      mb={5}
      ml={3}
      checked={active}
      onCheckedChange={handleSwitchChange}
    >
      미사용 포함 조회
    </Checkbox>
  );
}

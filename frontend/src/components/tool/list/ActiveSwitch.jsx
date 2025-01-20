import React, { useEffect, useState } from "react";
import { Switch } from "../ui/switch.jsx";
import { useSearchParams } from "react-router-dom";

export function ActiveSwitch({ onActiveChange }) {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [active, setActive] = useState({
    active: "",
  });

  useEffect(() => {
    const checkActive = searchParams.get("active");
    if (checkActive) {
      setActive(checkActive === "false");
    } else {
      setActive(!checkActive);
    }
  }, [searchParams]);

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
    <Switch my={5} checked={!active} onChange={handleSwitchChange}>
      전체 조회
    </Switch>
  );
}

import React, { useState } from "react";
import { Switch } from "../ui/switch.jsx";

export function ActiveSwitch({ defaultActive = true, onActiveChange }) {
  const [active, setActive] = useState(defaultActive);

  const handleSwitchChange = () => {
    setActive((prev) => {
      const newActive = !prev;
      onActiveChange(newActive); // 부모에 정확한 값 전달
      return newActive;
    });
  };

  return (
    <Switch checked={!active} onChange={handleSwitchChange}>
      전체 조회
    </Switch>
  );
}

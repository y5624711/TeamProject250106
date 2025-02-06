import React from "react";
import { Input } from "@chakra-ui/react";

function StockSerialInput({ serialNo, setSerialNo }) {
  return (
    <>
      <Input
        type={"text"}
        value={serialNo}
        onChange={(e) => {
          setSerialNo(e.target.value);
        }}
      />
    </>
  );
}

export default StockSerialInput;

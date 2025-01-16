import React, { useState } from "react";
import { Box, HStack, Input } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import axios from "axios";

function WarehouseAdd(props) {
  const [warehouseCode, setWarehouseCode] = useState();
  const [warehouseName, setWarehouseName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [warehouseAddressDetail, setWarehouseAddressDetail] = useState("");
  const [warehousePost, setWarehousePost] = useState("");
  const [warehouseState, setWarehouseState] = useState("");
  const [warehouseCity, setWarehouseCity] = useState("");
  const [customerEmployeeNo, setCustomerEmployeeNo] = useState("");
  const [warehouseTel, setWarehouseTel] = useState("");
  const [warehouseActive, setWarehouseActive] = useState("");
  const [warehouseNote, setWarehouseNote] = useState("");

  const handleSaveClick = () => {
    axios.post(`/api/warehouse/add`, {
      warehouseCode,
      warehouseName,
      customerCode,
      warehouseAddress,
      warehouseAddressDetail,
      warehousePost,
      warehouseState,
      warehouseCity,
      customerEmployeeNo,
      warehouseTel,
      warehouseActive,
      warehouseNote,
    });
  };

  return (
    <Box width="350px">
      <Box>
        창고 코드 (후에 자동생성으로 변경)
        <Input
          type={"text"}
          value={warehouseCode}
          onChange={(e) => setWarehouseCode(e.target.value)}
        />
        창고명 (창고코드 자동생성)
        <Input
          type={"text"}
          value={warehouseName}
          onChange={(e) => setWarehouseName(e.target.value)}
        />
        담당 업체
        <Input
          type={"text"}
          value={customerCode}
          onChange={(e) => setCustomerCode(e.target.value)}
        />
        주소
        <Input
          type={"text"}
          value={warehouseAddress}
          onChange={(e) => setWarehouseAddress(e.target.value)}
        />
        상세 주소
        <Input
          type={"text"}
          value={warehouseAddressDetail}
          onChange={(e) => setWarehouseAddressDetail(e.target.value)}
        />
        우편 번호
        <Input
          type={"text"}
          value={warehousePost}
          onChange={(e) => setWarehousePost(e.target.value)}
        />
        광역 시도
        <Input
          type={"text"}
          value={warehouseState}
          onChange={(e) => setWarehouseState(e.target.value)}
        />
        시군
        <Input
          type={"text"}
          value={warehouseCity}
          onChange={(e) => setWarehouseCity(e.target.value)}
        />
        관리자명
        <Input
          type={"text"}
          value={customerEmployeeNo}
          onChange={(e) => setCustomerEmployeeNo(e.target.value)}
        />
        전화번호
        <Input
          type={"text"}
          value={warehouseTel}
          onChange={(e) => setWarehouseTel(e.target.value)}
        />
        {/*취급 물품<Input>{warehouseDetail.}</Input>*/}
        사용 여부
        <Input
          type={"text"}
          value={warehouseActive}
          onChange={(e) => setWarehouseActive(e.target.value)}
        />
        비고
        <Input
          type={"text"}
          value={warehouseNote}
          onChange={(e) => setWarehouseNote(e.target.value)}
        />
      </Box>
      <br />
      <Box>
        <HStack>
          <div>
            <Button onClick={handleSaveClick}>저장</Button>
          </div>
          <div>
            <Button>취소</Button>
          </div>
        </HStack>
      </Box>
    </Box>
  );
}

export default WarehouseAdd;

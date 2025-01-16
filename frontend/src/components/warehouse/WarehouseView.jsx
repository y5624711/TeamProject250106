import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Input } from "@chakra-ui/react";

function WarehouseView({ warehouseKey }) {
  const [warehouseDetail, setWarehouseDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/warehouse/view/${warehouseKey}`)
      .then((res) => {
        setWarehouseDetail(res.data);
      })
      .catch((error) => {
        console.error("창고 상세 정보 요청 중 오류 발생: ", error);
      });
  }, [warehouseKey]);
  return (
    <Box width="350px">
      창고 코드
      <Input value={warehouseDetail.warehouseCode} />
      창고명
      <Input value={warehouseDetail.warehouseName} />
      담당 업체
      <Input value={warehouseDetail.customerCode} />
      주소
      <Input value={warehouseDetail.warehouseAddress} />
      상세 주소
      <Input value={warehouseDetail.warehouseAddressDetail} />
      우편 번호
      <Input value={warehouseDetail.warehousePost} />
      광역 시도
      <Input value={warehouseDetail.warehouseState} />
      시군
      <Input value={warehouseDetail.warehouseCity} />
      관리자명
      <Input value={warehouseDetail.customerCode} />
      전화번호
      <Input value={warehouseDetail.warehouseTel} />
      {/*취급 물품<Input>{warehouseDetail.}</Input>*/}
      사용 여부
      <Input value={warehouseDetail.warehouseActive} />
      비고
      <Input value={warehouseDetail.warehouseNote} />
    </Box>
  );
}

export default WarehouseView;

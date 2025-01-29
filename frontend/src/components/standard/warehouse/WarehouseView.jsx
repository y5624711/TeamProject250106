import React from "react";
import { Box, Input } from "@chakra-ui/react";

function WarehouseView({ warehouseDetail, setWarehouseDetail }) {
  return (
    <Box width="350px">
      창고 코드
      <Input value={warehouseDetail.warehouseCode} readOnly />
      창고명
      <Input
        value={warehouseDetail.warehouseName}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            warehouseName: e.target.value,
          })
        }
      />
      담당 업체
      <Input
        value={warehouseDetail.customerCode}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            customerCode: e.target.value,
          })
        }
      />
      주소
      <Input
        value={warehouseDetail.warehouseAddress}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            warehouseAddress: e.target.value,
          })
        }
      />
      상세 주소
      <Input
        value={warehouseDetail.warehouseAddressDetail}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            warehouseAddressDetail: e.target.value,
          })
        }
      />
      우편 번호
      <Input
        value={warehouseDetail.warehousePost}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            warehousePost: e.target.value,
          })
        }
      />
      광역 시도
      <Input
        value={warehouseDetail.warehouseState}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            warehouseState: e.target.value,
          })
        }
      />
      시군
      <Input
        value={warehouseDetail.warehouseCity}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            warehouseCity: e.target.value,
          })
        }
      />
      관리자명
      <Input
        value={warehouseDetail.customerEmployeeNo}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            customerEmployeeNo: e.target.value,
          })
        }
      />
      전화번호
      <Input
        value={warehouseDetail.warehouseTel}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            warehouseTel: e.target.value,
          })
        }
      />
      {/*취급 물품<Input>{warehouseDetail.}</Input>*/}
      사용 여부
      <Input
        value={warehouseDetail.warehouseActive}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            warehouseActive: e.target.value,
          })
        }
      />
      비고
      <Input
        value={warehouseDetail.warehouseNote}
        onChange={(e) =>
          setWarehouseDetail({
            ...warehouseDetail,
            warehouseNote: e.target.value,
          })
        }
      />
    </Box>
  );
}

export default WarehouseView;

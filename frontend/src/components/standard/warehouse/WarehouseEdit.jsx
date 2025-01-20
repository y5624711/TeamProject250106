import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, HStack, Input } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import { DialogConfirmation } from "../../tool/DialogConfirmation.jsx";

function WarehouseEdit({ warehouseKey, setIsEditing, isEditing }) {
  const [warehouseDetail, setWarehouseDetail] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleSaveClick() {
    axios.put(`/api/warehouse/edit`, {
      warehouseKey,
      warehouseCode: warehouseDetail.warehouseCode,
      warehouseName: warehouseDetail.warehouseName,
      customerCode: warehouseDetail.customerCode,
      warehouseAddress: warehouseDetail.warehouseAddress,
      warehouseAddressDetail: warehouseDetail.warehouseAddressDetail,
      warehousePost: warehouseDetail.warehousePost,
      warehouseState: warehouseDetail.warehouseState,
      warehouseCity: warehouseDetail.warehouseCity,
      customerEmployeeNo: warehouseDetail.customerEmployeeNo,
      warehouseTel: warehouseDetail.warehouseTel,
      warehouseActive: warehouseDetail.warehouseActive,
      warehouseNote: warehouseDetail.warehouseNote,
    });
    setIsEditing(!isEditing);
  }

  function handleCancelClick() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    if (warehouseKey) {
      axios
        .get(`/api/warehouse/view/${warehouseKey}`)
        .then((res) => {
          setWarehouseDetail(res.data);
        })
        .catch((error) => {
          console.error("창고 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [warehouseKey]);
  return (
    <Box width="350px">
      <Box>
        창고 코드
        <Input
          value={warehouseDetail.warehouseCode}
          onChange={(e) =>
            setWarehouseDetail({
              ...warehouseDetail,
              warehouseCode: e.target.value,
            })
          }
        />
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
      <br />
      <Box>
        <HStack>
          <Button onClick={() => setIsDialogOpen(true)}>저장</Button>
          <Button onClick={handleCancelClick}>취소</Button>
        </HStack>
      </Box>
      <DialogConfirmation
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleSaveClick}
        title="수정 확인"
        body="변경 내용을 저장하시겠습니까?"
      />
    </Box>
  );
}

export default WarehouseEdit;

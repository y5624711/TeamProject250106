import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, HStack, Input } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import { DialogEditConfirmation } from "../../tool/DialogEditConfirmation.jsx";

function LocationEdit({ locationKey, setIsEditing, isEditing }) {
  const [locationDetail, setLocationDetail] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  function handleSaveClick() {
    axios.put(`/api/location/edit`, {
      locationKey,
      warehouseCode: locationDetail.warehouseCode,
      row: locationDetail.row,
      col: locationDetail.col,
      shelf: locationDetail.shelf,
      itemCommonCode: locationDetail.itemCommonCode,
      locationNote: locationDetail.locationNote,
    });
    setIsEditing(!isEditing);
  }

  function handleCancelClick() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    if (locationKey) {
      axios
        .get(`/api/location/view/${locationKey}`)
        .then((res) => {
          setLocationDetail(res.data);
        })
        .catch((error) => {
          console.error("창고 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [locationKey]);

  return (
    <Box width="350px">
      <Box>
        창고 코드
        <Input
          value={locationDetail.warehouseCode}
          onChange={(e) =>
            setLocationDetail({
              ...locationDetail,
              warehouseCode: e.target.value,
            })
          }
        />
        행
        <Input
          value={locationDetail.row}
          onChange={(e) =>
            setLocationDetail({
              ...locationDetail,
              row: e.target.value,
            })
          }
        />
        열
        <Input
          value={locationDetail.col}
          onChange={(e) =>
            setLocationDetail({
              ...locationDetail,
              col: e.target.value,
            })
          }
        />
        단
        <Input
          value={locationDetail.shelf}
          onChange={(e) =>
            setLocationDetail({
              ...locationDetail,
              shelf: e.target.value,
            })
          }
        />
        아이템코드(추후 아이템 명, 셀렉트)
        <Input
          value={locationDetail.itemCommonCode}
          onChange={(e) =>
            setLocationDetail({
              ...locationDetail,
              itemCommonCode: e.target.value,
            })
          }
        />
        비고
        <Input
          value={locationDetail.locationNote}
          onChange={(e) =>
            setLocationDetail({
              ...locationDetail,
              locationNote: e.target.value,
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
      <DialogEditConfirmation
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleSaveClick}
        title="수정 확인"
        body="변경 내용을 저장하시겠습니까?"
      />
    </Box>
  );
}

export default LocationEdit;

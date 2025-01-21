import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Input } from "@chakra-ui/react";

function LocationView({ locationKey }) {
  const [locationDetail, setLocationDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/location/view/${locationKey}`)
      .then((res) => {
        setLocationDetail(res.data);
      })
      .catch((error) => {
        console.error("창고 상세 정보 요청 중 오류 발생: ", error);
      });
  }, []);

  return (
    <Box width="350px">
      <Box>
        창고 코드
        <Input value={locationDetail.warehouseCode} readOnly />
        창고명
        <Input value={locationDetail.warehouseName} readOnly />
        행
        <Input value={locationDetail.row} readOnly />
        열
        <Input value={locationDetail.col} readOnly />
        단
        <Input value={locationDetail.shelf} readOnly />
        품목 코드
        <Input value={locationDetail.itemCommonCode} readOnly />
        품목명
        <Input value={locationDetail.itemName} readOnly />
        비고
        <Input value={locationDetail.locationNote} readOnly />
      </Box>
      <br />
    </Box>
  );
}

export default LocationView;

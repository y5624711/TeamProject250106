import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Spinner, Stack } from "@chakra-ui/react";
import { BusinessInfo } from "./BusinessInfo.jsx";
import { toaster } from "../ui/toaster.jsx";

export function BusinessView() {
  const [business, setBusiness] = useState(null); // 초기값을 객체로 설정

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("/api/business/view")
      .then((res) => res.data)
      .then((data) => {
        setBusiness(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveClick = () => {
    axios
      .put("/api/business/update", {
        businessKey: business.businessKey,
        businessCode: business.businessCode,
        businessName: business.businessName,
        businessRep: business.businessRep,
        businessNo: business.businessNo,
        businessTel: business.businessTel,
        businessFax: business.businessFax,
        businessAddress: business.businessAddress,
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        setIsEditing(false);
      })
      .catch((e) => {
        const message = e.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Stack>
        <BusinessInfo
          business={business} // 현재 상태 전달
          setBusiness={setBusiness} // 상태 업데이트 핸들러 전달
          isEditing={isEditing} // 수정 상태 전달
          toggleEditing={() => setIsEditing(!isEditing)}
          handleSaveClick={handleSaveClick}
        />
      </Stack>
    </Box>
  );
}

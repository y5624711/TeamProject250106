import React, { useEffect, useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { InstallList } from "../../../components/state/install/InstallList.jsx";
import { InstallRequest } from "../../../components/state/install/InstallRequest.jsx";
import { InstallApprove } from "../../../components/state/install/InstallApprove.jsx";
import { InstallConfiguration } from "../../../components/state/install/InstallConfiguration.jsx";
import axios from "axios";

export function Install() {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [installList, setInstallList] = useState([]);
  const [installKey, setInstallKey] = useState(null);

  useEffect(() => {
    const fetchRequestList = axios.get("/api/install/list/request");
    const fetchApproveList = axios.get("/api/install/list/approve");

    Promise.all([fetchRequestList, fetchApproveList])
      .then(([requestRes, approveRes]) => {
        const requestList = requestRes.data.map((item) => ({
          ...item,
          state: "요청",
        }));
        const approveList = approveRes.data.map((item) => ({
          ...item,
          state: "승인",
        }));

        // 두 리스트를 합쳐서 설정
        setInstallList([...requestList, ...approveList]);
      })
      .catch((error) => {
        console.error("데이터 요청 중 오류 발생: ", error);
      });
  }, []);

  const handleRowClick = (key) => {
    setInstallKey(key);
    setApproveDialogOpen(true);
  };

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StateSideBar />
        <Stack flex={1}>
          <InstallList installList={installList} onRowClick={handleRowClick} />
          <Button
            onClick={() => setRequestDialogOpen(true)}
            size="lg"
            position="absolute"
            bottom="100px"
            right="100px"
          >
            출고 요청
          </Button>
        </Stack>
        <InstallRequest
          isOpen={requestDialogOpen}
          onClose={() => setRequestDialogOpen(false)}
        />
        <InstallApprove
          installKey={installKey}
          isOpen={approveDialogOpen}
          onClose={() => setApproveDialogOpen(false)}
        />
        <InstallConfiguration />
      </HStack>
    </Box>
  );
}

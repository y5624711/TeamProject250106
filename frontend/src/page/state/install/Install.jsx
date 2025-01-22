import React, { useEffect, useState } from "react";
import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { InstallList } from "../../../components/state/install/InstallList.jsx";
import { InstallRequest } from "../../../components/state/install/InstallRequest.jsx";
import { InstallApprove } from "../../../components/state/install/InstallApprove.jsx";
import axios from "axios";
import { InstallConfiguration } from "../../../components/state/install/InstallConfiguration.jsx";

export function Install() {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [configurationDialogOpen, setConfigurationDialogOpen] = useState(false);
  const [installList, setInstallList] = useState([]);
  const [installKey, setInstallKey] = useState(null);
  const [selectedInstall, setSelectedInstall] = useState(null); // 선택된 설치 정보

  useEffect(() => {
    const fetchRequestList = axios.get("/api/install/list/request");
    const fetchApproveList = axios.get("/api/install/list/approve");

    Promise.all([fetchRequestList, fetchApproveList])
      .then(([requestRes, approveRes]) => {
        const requestList = requestRes.data.map((item) => ({
          ...item,
          state:
            item.consent === true
              ? "요청 승인"
              : item.consent === false
                ? "요청 반려"
                : "요청 대기",
        }));
        const approveList = approveRes.data.map((item) => ({
          ...item,
          state:
            item.consent === true
              ? "설치 승인"
              : item.consent === false
                ? "설치 반려"
                : "설치 대기",
        }));

        // 두 리스트를 합쳐서 설정
        setInstallList([...requestList, ...approveList]);
      })
      .catch((error) => {
        console.error("데이터 요청 중 오류 발생: ", error);
      });
  }, []);
  console.log(installList);

  const handleRowClick = (key) => {
    setSelectedInstall(key);

    if (key.state === "요청 대기") {
      setApproveDialogOpen(true);
    } else if (key.state === "설치 대기" || key.state === "설치 승인") {
      setConfigurationDialogOpen(true);
    }
  };

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StateSideBar />
        <Stack flex={1} p={4}>
          <Heading size={"xl"} p={2} mb={3}>
            구매 / 설치 관리 {">"} 설치 관리
          </Heading>
          <InstallList installList={installList} onRowClick={handleRowClick} />
          <Button
            onClick={() => setRequestDialogOpen(true)}
            size="lg"
            position="fixed"
            bottom="60px"
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
          installKey={selectedInstall?.installRequestKey}
          isOpen={approveDialogOpen}
          onClose={() => setApproveDialogOpen(false)}
        />
        <InstallConfiguration
          installKey={selectedInstall?.installApproveKey}
          isOpen={configurationDialogOpen}
          onClose={() => setConfigurationDialogOpen(false)}
        />
      </HStack>
    </Box>
  );
}

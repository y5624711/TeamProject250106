import React, { useEffect, useState } from "react";
import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { InstallList } from "../../../components/state/install/InstallList.jsx";
import { InstallRequest } from "../../../components/state/install/InstallRequest.jsx";
import { InstallApprove } from "../../../components/state/install/InstallApprove.jsx";
import axios from "axios";
import { InstallConfiguration } from "../../../components/state/install/InstallConfiguration.jsx";
import { useSearchParams } from "react-router-dom";

export function Install() {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [configurationDialogOpen, setConfigurationDialogOpen] = useState(false);
  const [installList, setInstallList] = useState([]);
  const [selectedInstall, setSelectedInstall] = useState(null);
  const [change, setChange] = useState();
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams("");

  useEffect(() => {
    axios
      .get("/api/install/list", {
        params: searchParams,
      })
      .then((res) => {
        const formattedList = res.data.list.map((item) => {
          // requestKey 상태에 따라 "대기", "승인", "반려" 구분
          let state = null;

          if (!item.installApproveKey) {
            if (
              item.requestConsent === null ||
              item.requestConsent === undefined
            ) {
              state = "대기";
            } else if (item.requestConsent === true) {
              state = "승인";
            } else if (item.requestConsent === false) {
              state = "반려";
            }
          } else if (item.installApproveKey) {
            if (!item.approveConsent) {
              state = "승인";
            } else if (item.approveConsent === true) {
              state = "완료";
            } else if (item.approveConsent === false) {
              state = "반려";
            }
          }

          return { ...item, state };
        });
        setInstallList(formattedList || []);
        setCount(res.data.count);
      })
      .catch((error) => {
        console.error("품목 목록 요청 중 오류 발생: ", error);
      });
  }, [searchParams, change]);

  const handleRowClick = (key) => {
    setSelectedInstall(key);

    if (key.state === "대기" || key.state === "반려") {
      setApproveDialogOpen(true);
    } else if (key.state === "승인" || key.state === "완료") {
      setConfigurationDialogOpen(true);
    }
  };

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StateSideBar />
        <Stack flex={1} p={5}>
          <Heading size={"xl"} p={2} mb={3}>
            구매 / 설치 관리 {">"} 설치 관리
          </Heading>
          <InstallList
            installList={installList}
            onRowClick={handleRowClick}
            count={count}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button onClick={() => setRequestDialogOpen(true)} size="lg">
              설치 요청
            </Button>
          </Box>
        </Stack>
        <InstallRequest
          isOpen={requestDialogOpen}
          onClose={() => setRequestDialogOpen(false)}
          setChange={setChange}
        />
        <InstallApprove
          installKey={selectedInstall?.installRequestKey}
          isOpen={approveDialogOpen}
          onClose={() => setApproveDialogOpen(false)}
          setChange={setChange}
        />
        <InstallConfiguration
          installKey={selectedInstall?.installApproveKey}
          isOpen={configurationDialogOpen}
          onClose={() => setConfigurationDialogOpen(false)}
          setChange={setChange}
        />
      </HStack>
    </Box>
  );
}

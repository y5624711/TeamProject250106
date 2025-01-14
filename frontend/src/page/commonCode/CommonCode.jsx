import { Box } from "@chakra-ui/react";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { CommonList } from "./CommonList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export function CommonCode() {
  const [commonList, setCommonList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/commonCode/list")
      .then((res) => res.data)
      .then((data) => setCommonList(data));
  }, []);

  return (
    <Box>
      <SideBar title={"공통코드"}>
        <CommonList commonList={commonList} />
      </SideBar>
    </Box>
  );
}

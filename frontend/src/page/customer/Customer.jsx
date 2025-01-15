import React, { useEffect, useState } from "react";
import CustomerList from "../../components/customer/CustomerList.jsx";
import axios from "axios";
import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import CustomerAdd from "../../components/customer/CustomerAdd.jsx";
import CustomerView from "../../components/customer/CustomerView.jsx"; // import CustomerList from "../../components/customer/CustomerList.jsx";
// import CustomerList from "../../components/customer/CustomerList.jsx";
// import CustomerAdd from "../../components/customer/CustomerAdd.jsx";

function Customer() {
  const [customerList, setCustomerList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("customerList");
  const [selectedPage, setSelectedPage] = useState("view");
  const [customerKey, setCustomerKey] = useState(1);

  useEffect(() => {
    axios
      .get(`api/customer/list`)
      .then((res) => res.data)
      .then((data) => setCustomerList(data));
  }, []);

  // const handleSelectMenu = (menu) => {
  //   setSelectedMenu(menu);
  // };

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  // const handleSelectCustomer = () => {};

  return (
    <Box>
      {/*<Box display={"flex"}>*/}
      {/*  <CustomerSideBar onSelect={handleSelectMenu} />*/}
      {/*  {selectedMenu === "customerList" && <CustomerList />}*/}
      {/*  {selectedMenu === "customerAdd" && <CustomerAdd />}*/}
      {/*</Box>*/}
      <HStack align={"flex-start"}>
        <Stack>
          <CustomerList
            customerList={customerList}
            customerKey={customerKey}
            setCustomerKey={setCustomerKey}
          />
        </Stack>
        <Stack>
          {selectedPage === "view" && (
            <Button onClick={() => handleSelectPage("add")}>추가</Button>
          )}

          {/* 조건부 렌더링 */}
          {selectedPage === "add" ? (
            <CustomerAdd onCancel={() => handleSelectPage("view")} />
          ) : (
            <CustomerView customerKey={customerKey} />
          )}
        </Stack>
      </HStack>
    </Box>
  );
}

export default Customer;

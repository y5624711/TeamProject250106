import React, { useEffect, useState } from "react";
import CustomerList from "../../components/customer/CustomerList.jsx";
import axios from "axios"; // import CustomerList from "../../components/customer/CustomerList.jsx";
// import CustomerList from "../../components/customer/CustomerList.jsx";
// import CustomerAdd from "../../components/customer/CustomerAdd.jsx";

function Customer() {
  const [selectedMenu, setSelectedMenu] = useState("customerList");
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    axios
      .get(`api/customer/list`)
      .then((res) => res.data)
      .then((data) => setCustomerList(data));
  }, []);

  // const handleSelectMenu = (menu) => {
  //   setSelectedMenu(menu);
  // };

  // const handleSelectCustomer = () => {};

  return (
    <div>
      {/*<Box display={"flex"}>*/}
      {/*  <CustomerSideBar onSelect={handleSelectMenu()} />*/}
      {/*  {selectedMenu === "customerList" && <CustomerList />}*/}
      {/*  {selectedMenu === "customerAdd" && <CustomerAdd />}*/}
      {/*</Box>*/}
      <CustomerList customerList={customerList} />
    </div>
  );
}

export default Customer;

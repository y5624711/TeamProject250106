import React, { useState } from "react";
import CustomerMenu from "../../components/customer/CustomerMenu.jsx";
import CustomerAddComp from "../../components/customer/CustomerAddComp.jsx";

function CustomerAdd(props) {
  const [name, setName] = useState("");
  const [productCode, setProductCode] = useState(null);
  const [post, setPost] = useState("");
  const [address, newAddress] = useState("");
  const [details, setDetails] = useState("");
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [representative, setRepresentative] = useState("");
  const [tel, setTel] = useState("");
  const [fax, setFax] = useState(null);
  const [active, setActive] = useState(true);
  const [note, setNote] = useState(null);

  return (
    <div>
      <CustomerMenu />
      <CustomerAddComp />
    </div>
  );
}

export default CustomerAdd;

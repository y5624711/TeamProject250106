import { useEffect, useState } from "react";
import axios from "axios";

export function MainCusViewEndEdit({ company, cusViewOpen, setCusViewOpen }) {
  const [customer, setCustomer] = useState();

  useEffect(() => {
    axios
      .get(`/api/main/mainCustomerView/${company}}`)
      .then((res) => res.data)
      .then((data) => {
        console.log("옴", data);
      });
  }, []);

  return null;
}

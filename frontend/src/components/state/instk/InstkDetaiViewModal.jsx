import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Button } from "../../ui/button.jsx";
import {
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import axios from "axios";

export function InstkDetaiViewModal({ isModalOpen, setChangeModal, instk }) {
  const { id } = useContext(AuthenticationContext);
  const [detailData, setDetailData] = useState({ serialList: [] });
  const [serialLocationList, setSerialLocationList] = useState(null);

  const items = ["Option 1", "Option 2", "Option 3"];

  useEffect(() => {
    axios.get(`/api/instk/detailview/${instk.inputKey}`,{
      params:{
        inputCommonCodeName:instk.inputCommonCodeName,
        inputNo:instk.inputNo,
      }

    }).then((res) => {
      console.log(res.data);
      setDetailData(res.data);
      // const formattedList = createListCollection({
      //   items: res.data.map((item) => ({
      //     label: item.customerName,
      //     value: item.customerCode,
      //   })),
      // });
      // setCodeList(formattedList);
    });
  }, []);

  console.log(detailData.serialLocationList);

  return (
    <DialogRoot size={"lg"} open={isModalOpen} onOpenChange={setChangeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>입고 상세</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={15}>
            <HStack>
              <Field orientation="horizontal" label={"입고 구분 명"}>
                <Input value={instk.inputCommonCodeName} />
              </Field>
              <Field orientation="horizontal" label={"주문 번호"}>
                <Input readOnly value={instk.inputNo} />
              </Field>
            </HStack>
            <HStack>
              <Field orientation="horizontal" label={"품목 명"}>
                <Input readOnly value={instk.itemCommonName} />
              </Field>
              <Field label={"시리얼 번호"} orientation="horizontal">
                {/*<SelectRoot*/}
                {/*  collection={frameworks}*/}
                {/*  value={formData.workPlace}*/}
                {/*  onValueChange={handleSelectChange}*/}
                {/*  position="relative"*/}
                {/*>*/}
                {/*  <SelectTrigger>*/}
                {/*    <SelectValueText placeholder={"선택 해 주세요"} />*/}
                {/*  </SelectTrigger>*/}
                {/*  <SelectContent*/}
                {/*    style={{*/}
                {/*      width: "100%",*/}
                {/*      top: "40px",*/}
                {/*      position: "absolute",*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    {frameworks.items.map((code, index) => (*/}
                {/*      <SelectItem item={code} key={index}>*/}
                {/*        {code.label}*/}
                {/*      </SelectItem>*/}
                {/*    ))}*/}
                {/*  </SelectContent>*/}
                {/*</SelectRoot>*/}
                <Input readOnly value={detailData?.serialLocationList?.[0].serialNo || ""} />
              </Field>
            </HStack>

            <HStack>
              <Field label={"주문 요청자"} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeName} />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeNo} />
              </Field>
            </HStack>
            <HStack>
              <Field label={"담당 업체"} orientation="horizontal">
                <Input readOnly value={instk.customerName} />
              </Field>
              <Field label={"창고"} orientation="horizontal">
                <Input readOnly value={detailData.wareHouseName} />
              </Field>
            </HStack>
            <HStack>
              <Field label={"입고 승인자"} orientation="horizontal">
                <Input readOnl value={instk.inputStockEmployeeName} />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input readOnl value={instk.inputStockEmployeeNo} />
              </Field>
            </HStack>
            <Field label={"승인 비고"} orientation="horizontal">
              <Input readOnly value={instk.inputNote} />
            </Field>
            <Field label={"입고 날짜"} orientation="horizontal">
              <Input readOnly value={instk.inputStockDate} />
            </Field>
            <Field label={"입고 비고"} orientation="horizontal">
              <Input readOnly value={instk.inputStockNote} />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setChangeModal();
              }}
            >
              닫기
            </Button>
        </DialogFooter>
        <DialogCloseTrigger
          onClick={() => {
            setChangeModal();
          }}
        />
      </DialogContent>
    </DialogRoot>
  );
}

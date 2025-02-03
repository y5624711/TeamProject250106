import React, { useContext, useEffect, useState } from "react";
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
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import Select from "react-select";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import { toaster } from "../../ui/toaster.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";

function ReturnRequest({ isOpen, onClose, onRequest }) {
  const { id, name } = useContext(AuthenticationContext);
  // console.log(id, name);

  //반품 요청창 초기상태
  const initialRequestData = {
    serialNo: "",
    itemCommonName: "",
    franchiseName: "",
    customerName: "",
    businessEmployeeNo: id,
    businessEmployeeName: name,
    returnRequestNote: "",
  };

  const [serialNo, setSerialNo] = useState("");
  const [franchiseList, setFranchiseList] = useState([]);
  const [localFranchiseName, setLocalFranchiseName] = useState("");
  const [localFranchiseCode, setLocalFranchiseCode] = useState("");
  const [serialNoList, setSerialNoList] = useState([
    { value: "", label: "내용 없음" },
  ]);
  const [requestData, setRequestData] = useState(initialRequestData);
  // console.log(requestData);

  //창 열릴 때 실행
  useEffect(() => {
    //작성자 초기설정
    setRequestData((prev) => ({
      ...prev,
      businessEmployeeNo: id,
      businessEmployeeName: name,
    }));

    // 가맹점 목록 가져오기
    axios.get(`/api/install/franchise`).then((res) => {
      // console.log("호출", res.data);
      const franchiseOptions = res.data.map((franchise) => ({
        value: franchise.franchise_code,
        label: franchise.franchise_name,
      }));
      setFranchiseList(franchiseOptions);
    });
  }, [id, name]);

  //가맹점이 가진 시리얼 번호 불러오기
  const onFranchiseClick = () => {
    setRequestData((prev) => ({
      ...prev,
      ["franchiseName"]: localFranchiseName,
      ["franchiseCode"]: localFranchiseCode,
      ["serialNo"]: "",
    }));
    if (localFranchiseCode) {
      axios
        .get(`api/return/serialNoList/${localFranchiseCode}`)
        .then((res) => {
          // console.log("serial 반환", res.data);
          const serialNoOptions = res.data.map((serialNo) => ({
            value: serialNo.serialNo,
            label: serialNo.serialNo,
          }));
          setSerialNoList(serialNoOptions);
        })
        .catch((e) => console.error(e));
    }
  };

  // console.log("serialList", serialNoList);

  //시리얼 번호로 정보 불러오기
  useEffect(() => {
    if (serialNo) {
      axios.get(`api/return/${serialNo}`).then((res) => {
        // console.log("호출정보", res.data);
        setRequestData((prev) => ({
          ...prev,
          itemCommonName: res.data[0].itemCommonName || "등록되지 않음",
          itemCommonCode: res.data[0].itemCommonCode || "",
          customerName: res.data[0].customerName || "등록되지 않음",
          customerCode: res.data[0].customerCode || "",
        }));
      });
    }
  }, [serialNo]);

  //정보 기입 핸들러
  const handleInput = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setRequestData((prev) => ({ ...prev, [field]: value }));
  };

  //가맹점 select
  const handleFranchiseChange = (selectedOption) => {
    // console.log("선택", selectedOption);
    setLocalFranchiseName(selectedOption.label);
    setLocalFranchiseCode(selectedOption.value);
  };

  // console.log(franchiseName, franchiseCode);

  //반품 요청
  const handleRequestButtonClick = () => {
    if (validate()) {
      axios
        .post("/api/return/request", requestData)
        .then((res) => res.data)
        .then((data) => {
          toaster.create({
            description: data.message.text,
            type: data.message.type,
          });
          onRequest();
          setRequestData(initialRequestData);
          onClose();
        })
        .catch((e) => {
          console.error("반품 요청 에러", e);
          const message = e.response.data.message;
          toaster.create({
            type: message.type,
            description: message.text,
          });
        });
    }
  };

  const handleCancel = () => {
    setRequestData(initialRequestData);
    onClose();
  };

  //유효성 검사
  const validate = () => {
    return (
      requestData.businessEmployeeName != "" &&
      requestData.businessEmployeeNo != "" &&
      requestData.franchiseName != "" &&
      requestData.serialNo != ""
    );
  };

  // console.log("requestData", requestData);
  // console.log(validate());

  return (
    <DialogRoot open={isOpen} onOpenChange={handleCancel} size={"lg"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>반품 요청</DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Field orientation="horizontal" label="가맹점">
            <Select
              options={franchiseList}
              value={franchiseList.find(
                (opt) => opt.value === requestData.franchiseName,
              )}
              onChange={handleFranchiseChange}
              placeholder="가맹점 선택"
              isSearchable
              styles={{
                control: (base) => ({
                  ...base,
                  width: "470px", // 너비 고정
                  height: "40px",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 100, // 선택 목록이 다른 요소를 덮도록
                  width: "470px",
                }),
              }}
            />
            {/*<Input*/}
            {/*  value={requestData.franchiseName}*/}
            {/*  // placeholder="OOO점"*/}
            {/*  onChange={handleInput("franchiseName")}*/}
            {/*/>*/}
            <Button onClick={onFranchiseClick}>조회</Button>
          </Field>
          <HStack>
            <Field orientation="horizontal" label="시리얼 번호">
              <SelectRoot
                value={requestData.serialNo}
                onValueChange={(e) => {
                  setSerialNo(e.value);
                  setRequestData((prev) => ({
                    ...prev,
                    ["serialNo"]: e.value[0],
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValueText>
                    {requestData.serialNo || "반품할 물품 선택"}
                  </SelectValueText>
                </SelectTrigger>
                <SelectContent
                  style={{
                    top: "40px",
                    position: "absolute",
                    zIndex: 100,
                    width: "72.5%",
                  }}
                >
                  {serialNoList.map((option) => (
                    <SelectItem item={option} key={option.value}>
                      {option.label}
                    </SelectItem>
                  )) || "내역 없음"}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field orientation="horizontal" label="품목">
              <Input
                readOnly
                value={requestData.itemCommonName}
                // placeholder={"OOOO"}
              />
            </Field>
          </HStack>
          <Field orientation="horizontal" label="담당 업체">
            <Input
              readOnly
              value={requestData.customerName}
              // placeholder="OOOO"
            />
          </Field>
          <HStack>
            <Field orientation="horizontal" label="요청자">
              <Input
                readOnly
                value={requestData.businessEmployeeName}
                // onChange={handleInput("businessEmployeeName")}
              />
            </Field>
            <Field orientation="horizontal" label="사번">
              <Input
                value={requestData.businessEmployeeNo}
                readOnly
                // onChange={handleInput("businessEmployeeNo")}
              />
            </Field>
          </HStack>
          <Field orientation="horizontal" label="비고">
            <Textarea
              value={requestData.returnRequestNote}
              placeholder="최대 50자"
              onChange={handleInput("returnRequestNote")}
              style={{ maxHeight: "100px", overflowY: "auto" }}
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button onClick={handleCancel} variant="outline">
              취소
            </Button>
          </DialogActionTrigger>
          <Tooltip
            content="입력을 완료해 주세요."
            openDelay={100}
            closeDelay={100}
            disabled={validate()}
          >
            <Button onClick={handleRequestButtonClick} disabled={!validate()}>
              요청
            </Button>
          </Tooltip>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default ReturnRequest;

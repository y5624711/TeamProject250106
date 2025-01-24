import React, { useEffect, useState } from "react";
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

function ReturnRequest({ isOpen, onClose, onRequest }) {
  //반품 요청창 초기상태
  const initialRequestData = {
    serialNo: "",
    itemCommonName: "",
    franchiseName: "",
    customerName: "",
    businessEmployeeNo: "",
    businessEmployeeName: "",
    returnRequestNote: "",
  };

  const [requestData, setRequestData] = useState(initialRequestData);
  const [serialNo, setSerialNo] = useState("");
  const [franchiseList, setFranchiseList] = useState([]);
  const [localFranchiseName, setLocalFranchiseName] = useState("");
  const [localFranchiseCode, setLocalFranchiseCode] = useState("");
  const [serialNoList, setSerialNoList] = useState([
    { value: "", label: "내용 없음" },
  ]);

  // console.log("serial no1", requestData.serialNo);
  // console.log("serial no2", serialNo);

  // 가맹점 목록 가져오기
  useEffect(() => {
    axios.get(`/api/install/franchise`).then((res) => {
      // console.log("호출", res.data);
      const franchiseOptions = res.data.map((franchise) => ({
        value: franchise.franchise_code,
        label: franchise.franchise_name,
      }));
      setFranchiseList(franchiseOptions);
    });
  }, []);

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
      axios.get(`api/return/serialNo/${serialNo}`).then((res) => {
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
  // console.log("requestData", requestData);

  const handleFranchiseChange = (selectedOption) => {
    // console.log("선택", selectedOption);
    setLocalFranchiseName(selectedOption.label);
    setLocalFranchiseCode(selectedOption.value);
  };

  // console.log(franchiseName, franchiseCode);

  //반품 요청
  const handleRequestButtonClick = () => {
    axios
      .post("/api/return/request", requestData)
      .then((res) => res.data)
      .then((data) => {
        onRequest(requestData);
        setRequestData(initialRequestData);
      });
  };

  const handleCancel = () => {
    setRequestData(initialRequestData);
    onClose();
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={handleCancel} size={"lg"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>반품 신청</DialogTitle>
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
                    position: "absolute", // 요소가 다른 컨텐츠를 밀지 않게 설정
                    zIndex: 100, // 드롭다운이 다른 요소 위에 나타나도록
                    width: "72.5%", // 드롭다운 너비를 트리거와 동일하게
                  }}
                >
                  {serialNoList.map((option) => (
                    <SelectItem item={option} key={option.value}>
                      {option.label}
                    </SelectItem>
                  )) || "내역 없음"}
                </SelectContent>
              </SelectRoot>
              {/*<Input*/}
              {/*  // placeholder="00000000000000000000"*/}
              {/*  value={requestData.serialNo}*/}
              {/*  onChange={handleInput("serialNo")}*/}
              {/*/>*/}
              {/*<Button onClick={() => setSerialNo(requestData.serialNo)}>*/}
              {/*  조회*/}
              {/*</Button>*/}
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
            <Field orientation="horizontal" label="신청자">
              <Input
                value={requestData.businessEmployeeName}
                // placeholder="홍길동"
                onChange={handleInput("businessEmployeeName")}
              />
            </Field>
            <Field orientation="horizontal" label="사번">
              <Input
                value={requestData.businessEmployeeNo}
                // placeholder="0000000000000"
                onChange={handleInput("businessEmployeeNo")}
              />
            </Field>
          </HStack>
          <Field orientation="horizontal" label="비고">
            <Textarea
              value={requestData.returnRequestNote}
              placeholder="최대 50자"
              onChange={handleInput("businessEmployeeName")}
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button onClick={handleCancel} variant="outline">
              취소
            </Button>
          </DialogActionTrigger>
          <Button onClick={handleRequestButtonClick}>신청</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default ReturnRequest;

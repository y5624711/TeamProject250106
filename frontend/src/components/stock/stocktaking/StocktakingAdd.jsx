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
import { Box, HStack, Input, Textarea } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";
import Select from "react-select";
import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";

function StocktakingAdd({
  isOpen,
  onClose,
  title,
  setStocktakingList,
  searchParams,
}) {
  const [warehouseCode, setWarehouseCode] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [countCurrent, setCountCurrent] = useState("");
  const [countConfiguration, setCountConfiguration] = useState("");
  const [stocktakingNote, setStocktakingNote] = useState("");
  const [stocktakingType, setStocktakingType] = useState(true);
  const initialStocktakingAdd = {
    warehouseName: "",
    warehouseCode: "",
    itemCode: "",
    itemName: "",
    countCurrent: "",
    countConfiguration: "",
    stocktakingNote: "",
    stocktakingType: true,
  };
  const [stocktakingAdd, setStocktakingAdd] = useState(initialStocktakingAdd);
  const [warehouseList, setWarehouseList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [difference, setDifference] = useState(null);
  const [stockLocation, setStockLocation] = useState([]);
  const [searchClick, setSearchClick] = useState(false);
  const [makeDifference, setMakeDifference] = useState(0);

  const resetState = () => {
    setWarehouseCode("");
    setWarehouseName("");
    setItemName("");
    setItemCode("");
    setCountCurrent("");
    setCountConfiguration("");
    setStocktakingNote("");
    setStocktakingType(true);
  };

  // 요청 창 닫히면 초기화
  const handleClose = () => {
    setStocktakingAdd(initialStocktakingAdd);
    resetState();
    onClose();
  };

  // 창고 정보 가져오기
  useEffect(() => {
    axios.get(`/api/stocktaking/warehouse`).then((res) => {
      const warehouseOptions = res.data.map((warehouse) => ({
        value: warehouse.warehouseCode,
        label: warehouse.warehouseName,
      }));
      setWarehouseList(warehouseOptions);
    });
  }, []);

  // 물품 정보 가져오기
  useEffect(() => {
    if (warehouseCode) {
      axios.get(`/api/stocktaking/item/${warehouseCode}`).then((res) => {
        const itemOptions = res.data.map((item) => ({
          value: item.itemCode,
          label: item.itemName,
        }));
        setItemList(itemOptions);
      });
    }
  }, [warehouseCode]);

  // 창고 & 품목 변경 시 전산 수량(countCurrent) 불러오기
  useEffect(() => {
    if (warehouseCode && itemCode) {
      axios
        .get(`/api/stocktaking/count/${warehouseCode}/${itemCode}`)
        .then((res) => {
          console.log(res.data);
          setCountCurrent(res.data); // 백엔드에서 받은 전산 수량 값 설정
          setStocktakingAdd((prev) => ({
            ...prev,
            countCurrent: res.data, // stocktakingAdd에도 값 반영
          }));
        })
        .catch((err) => {
          console.error("전산 수량 조회 실패", err);
          setCountCurrent(""); // 에러 발생 시 초기화
        });
    }
  }, [warehouseCode, itemCode]);

  useEffect(() => {}, [countCurrent]);

  // 창고 변경 시 관리자 컬렉션 생성
  const handleWarehouseChange = (selectedOption) => {
    setWarehouseName(selectedOption.label);
    setWarehouseCode(selectedOption.value);
    setSelectedWarehouse(selectedOption);

    // 선택 즉시 stocktakingAdd 업데이트
    setStocktakingAdd((prev) => ({
      ...prev,
      warehouseName: selectedOption.label,
      warehouseCode: selectedOption.value,
    }));
  };

  // 유효성 검증
  const isValid =
    warehouseCode && itemCode && countCurrent && countConfiguration;

  // 물품 변경
  const handleItemChange = (selectedOption) => {
    setItemName(selectedOption.label);
    setItemCode(selectedOption.value);
    setSelectedItem(selectedOption);

    // 선택 즉시 stocktakingAdd 업데이트
    setStocktakingAdd((prev) => ({
      ...prev,
      itemName: selectedOption.label,
      itemCode: selectedOption.value,
    }));
  };

  // 창고 클릭 시
  const onWarehouseClick = () => {
    if (selectedWarehouse) {
      setStocktakingAdd((prev) => ({
        ...prev,
        warehouseName: selectedWarehouse.label,
        warehouseCode: selectedWarehouse.value,
      }));
    }
  };

  const handleSaveClick = () => {
    axios
      .post(`/api/stocktaking/add`, {
        warehouseCode,
        itemCode,
        countCurrent,
        countConfiguration,
        stocktakingNote,
        stocktakingType,
      })
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        handleClose();
        onClose();
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  useEffect(() => {
    if (!isOpen) {
      handleClose(); // 다이얼로그가 닫히면 항상 초기화
    }
  }, [isOpen]);

  //유효성 검사
  const validate = () => {
    return (
      warehouseCode != "" &&
      itemCode != "" &&
      countCurrent !== null &&
      countCurrent !== undefined && // ✅ 0도 유효한 값이므로 null/undefined만 체크
      countConfiguration !== null &&
      countConfiguration !== undefined &&
      countConfiguration !== "" &&
      stocktakingType !== null &&
      difference !== null &&
      searchClick === true &&
      makeDifference + countCurrent - countConfiguration === 0
      //   makeDifference 를 통해 값이 같을 때 등록 가능하게 하기
    );
  };

  const handleDifferentClick = () => {
    {
      countCurrent > countConfiguration
        ? setDifference("1")
        : countCurrent < countConfiguration
          ? setDifference("2")
          : setDifference("0");

      setSearchClick(true);
    }
  };
  console.log(difference);

  useEffect(() => {
    console.log("difference 값 변경됨:", difference);
  }, [difference]);

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Box>
            <Field label="창고" orientation="horizontal" mb={15} required>
              <Select
                options={warehouseList}
                value={warehouseList.find(
                  (opt) => opt.value === stocktakingAdd.warehouseName,
                )}
                onChange={handleWarehouseChange}
                placeholder="창고 선택"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    width: "538.5px", // 너비 고정
                    height: "40px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100, // 선택 목록이 다른 요소를 덮도록
                    width: "538.5px",
                  }),
                }}
              />
              {/*<Button onClick={onWarehouseClick}>조회</Button>*/}
            </Field>
            <Field label="품목" orientation="horizontal" mb={15} required>
              <Select
                options={itemList}
                value={itemList.find(
                  (opt) => opt.value === stocktakingAdd.itemName,
                )}
                onChange={handleItemChange}
                placeholder="물품 선택"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    width: "538.5px", // 너비 고정
                    height: "40px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100, // 선택 목록이 다른 요소를 덮도록
                    width: "538.5px",
                  }),
                }}
              />
            </Field>
            <Box display="flex" gap={4}>
              <Field
                label="전산 수량"
                orientation="horizontal"
                mb={15}
                required
              >
                <Input type={"text"} value={countCurrent} readOnly />
              </Field>
              <Field
                label="실제 수량"
                orientation="horizontal"
                mb={15}
                required
              >
                <Input
                  type={"text"}
                  value={countConfiguration}
                  onChange={(e) => {
                    setCountConfiguration(e.target.value);
                    setSearchClick(false);
                  }}
                />
              </Field>
              <Button onClick={handleDifferentClick}>조회</Button>
            </Box>

            <Field label="비고" orientation="horizontal" mb={15}>
              <Textarea
                style={{ maxHeight: "100px", overflowY: "auto" }}
                placeholder="최대 50자"
                type={"text"}
                value={stocktakingNote}
                onChange={(e) => setStocktakingNote(e.target.value)}
              />
            </Field>
            <Box display="flex" gap={4}>
              <Field
                label="실사 유형"
                orientation="horizontal"
                mb={15}
                required
              >
                <Box ml={"86px"} style={{ position: "absolute" }}>
                  <RadioGroup
                    defaultValue="true" // ✅ Boolean 값을 문자열로 변환
                    onChange={(e) => setStocktakingType(e.target.value)} // ✅ 문자열을 다시 Boolean으로 변환
                  >
                    <HStack gap="6">
                      <Radio value="true">정기 실사</Radio>
                      <Radio value="false">비정기 실사</Radio>
                    </HStack>
                  </RadioGroup>
                </Box>
                {/*<Input*/}
                {/*  type={"text"}*/}
                {/*  value={stocktakingType}*/}
                {/*  onChange={(e) => setStocktakingType(e.target.value)}*/}
                {/*/>*/}
              </Field>
            </Box>
            {difference !== null && (
              <>
                <hr />
                <Box>
                  {difference === "1" && "전산 수량이 더 많아"}
                  {difference === "2" && "실제 수량이 더 많아"}
                  {difference === "0" && "수량이 동일해"}
                </Box>
              </>
            )}
          </Box>
          {/*  TODO: 실사유형 radio로 체크  */}
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={onClose} />
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
          </DialogActionTrigger>
          <Tooltip
            content="입력을 완료해 주세요."
            openDelay={100}
            closeDelay={100}
            disabled={validate()}
          >
            <Button
              variant="solid"
              onClick={() => {
                handleSaveClick();
              }}
              disabled={!validate()}
            >
              등록
            </Button>
          </Tooltip>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default StocktakingAdd;

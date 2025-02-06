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
  Center,
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import { Field } from "../../ui/field.jsx";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import axios from "axios";
import Select from "react-select";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

export function InstkDetaiViewModal({
  isModalOpen,
  setChangeModal,
  instk,
  isLoading,
}) {
  const { id } = useContext(AuthenticationContext);
  const [detailData, setDetailData] = useState({ serialList: [] });
  const [serialLocationList, setSerialLocationList] = useState([]);
  const [item, setItem] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectLocationKey, setSelectLocationKey] = useState();

  const contentRef = useRef(null);

  useEffect(() => {
    if (!instk?.inputKey) return; // instk가 없으면 실행 안 함

    setIsDataLoading(true); // 데이터 로딩 시작

    axios
      .get(`/api/instk/detailview/${instk.inputKey}`, {
        params: {
          inputCommonCodeName: instk.inputCommonCodeName,
        },
      })
      .then((res) => {
        setDetailData(res.data);
        const list = res.data?.serialLocationList || [];

        if (list.length > 0) {
          const formattedList = createListCollection({
            items: list.map((item) => ({
              label: `${item.serialNo}`,
              value: item.locationKey,
            })),
          });
          console.log(formattedList, "formait:리스트컬렉션");
          setSerialLocationList(formattedList);
        } else {
          setSerialLocationList([]); // 빈 배열로 설정하여 오류 방지
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setSerialLocationList(null); // 에러 발생 시 리스트 초기화
      })
      .finally(() => {
        setIsDataLoading(false); // 데이터 로딩 완료
      });
  }, [instk]); // instk가 변경될 때마다 실행

  if (isLoading || isDataLoading) {
    return <Input readOnly value="로딩 중..." />;
  }

  const handleSerialChange = (e) => {
    setItem(e.value);
    setSelectLocationKey(e.value);
  };

  return (
    <DialogRoot size={"lg"} open={isModalOpen} onOpenChange={setChangeModal}>
      <DialogContent ref={contentRef}>
        <DialogHeader>
          <DialogTitle>
            {detailData.inputConsent == true ? "입고 상세" : "입고 반려"}
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <DialogBody>
            <Center p={4}>
              <Spinner /> {/* 또는 다른 로딩 인디케이터 */}
            </Center>
          </DialogBody>
        ) : (
          <DialogBody>
            <Stack gap={15}>
              <HStack>
                <Field
                  orientation="horizontal"
                  label={<SpacedLabel text="입고 구분" req />}
                >
                  <Input readOnly value={instk.inputCommonCodeName} />
                </Field>
                <Field
                  orientation="horizontal"
                  label={<SpacedLabel text="주문번호" req />}
                >
                  <Input readOnly value={instk.inputNo} />
                </Field>
              </HStack>
              <HStack>
                <Field
                  orientation="horizontal"
                  label={<SpacedLabel text="품목" req />}
                >
                  <Input readOnly value={instk.itemCommonName} />
                </Field>

                {detailData.inputConsent && (
                  <Field
                    orientation="horizontal"
                    label={<SpacedLabel text="시리얼번호" req />}
                  >
                    <SelectRoot
                      collection={serialLocationList}
                      value={item || ""}
                      position="relative"
                      onValueChange={handleSerialChange}
                    >
                      {/*<SelectLabel orientation="horizontal">*/}
                      {/*  시리얼 번호*/}
                      {/*</SelectLabel>*/}
                      <SelectTrigger>
                        <SelectValueText placeholder={"내역 확인"} />
                      </SelectTrigger>
                      <SelectContent
                        portalRef={contentRef}
                        style={{
                          width: "100%",
                          top: "40px",
                          position: "absolute",
                        }}
                      >
                        {serialLocationList.items.map((code, index) => (
                          <SelectItem item={code} key={index}>
                            {code.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                  </Field>
                )}
              </HStack>
              <HStack>
                <Field
                  label={<SpacedLabel text="주문요청자" req />}
                  orientation="horizontal"
                >
                  <Input readOnly value={instk.requestEmployeeName} />
                </Field>
                <Field
                  label={<SpacedLabel text="사번" req />}
                  orientation="horizontal"
                >
                  <Input readOnly value={instk.requestEmployeeNo} />
                </Field>
              </HStack>
              <HStack>
                <Field
                  label={<SpacedLabel text="담당업체" req />}
                  orientation="horizontal"
                >
                  <Input readOnly value={instk.customerName} />
                </Field>

                <Field
                  label={<SpacedLabel text="창고주소" req />}
                  orientation="horizontal"
                >
                  <Input readOnly value={detailData.wareHouseAddress} />
                </Field>
              </HStack>

              <Field
                label={<SpacedLabel text="창고정보" req />}
                orientation="horizontal"
              >
                <Input
                  readOnly
                  value={`${detailData.wareHouseName}${detailData.inputConsent ? ` (Location: ${selectLocationKey || ""})` : ""}`}
                />
              </Field>

              <Field
                label={<SpacedLabel text="주문비고" req />}
                orientation="horizontal"
              >
                {instk.inputNote ? (
                  <Textarea
                    readOnly
                    value={instk.inputNote}
                    style={{ maxHeight: "100px", overflowY: "auto" }}
                  />
                ) : (
                  <Input readOnly value={"내용 없음"} />
                )}
              </Field>
              {detailData.inputConsent === true ? (
                <HStack>
                  <Field
                    label={<SpacedLabel text="승인자" req />}
                    orientation="horizontal"
                  >
                    <Input readOnly value={instk.inputStockEmployeeName} />
                  </Field>
                  <Field
                    label={<SpacedLabel text="사번" req />}
                    orientation="horizontal"
                  >
                    <Input readOnly value={instk.inputStockEmployeeNo} />
                  </Field>
                </HStack>
              ) : (
                <HStack>
                  <Field
                    label={<SpacedLabel text="반려자" req />}
                    orientation="horizontal"
                  >
                    <Input readOnly value={detailData.disapproveEmployeeName} />
                  </Field>
                  <Field
                    label={<SpacedLabel text="사번" req />}
                    orientation="horizontal"
                  >
                    <Input readOnly value={detailData.disapproveEmployeeNo} />
                  </Field>
                </HStack>
              )}

              {detailData.inputConsent === true ? (
                <Field
                  label={<SpacedLabel text="승인날짜" req />}
                  orientation="horizontal"
                >
                  <Input readOnly value={instk.inputStockDate} />
                </Field>
              ) : (
                <Field
                  label={<SpacedLabel text="반려날짜" req />}
                  orientation="horizontal"
                >
                  <Input readOnly value={detailData.disapproveDate} />
                </Field>
              )}

              {/*true고  비고 없으면 필드 , */}
              {detailData.inputConsent === true ? (
                // true
                <Field
                  label={<SpacedLabel text="승인비고" req />}
                  orientation="horizontal"
                >
                  {instk.inputStockNote ? (
                    <Textarea
                      readOnly
                      value={instk.inputStockNote}
                      style={{ maxHeight: "100px", overflowY: "auto" }}
                    />
                  ) : (
                    <Input readOnly value={"내용 없음"} />
                  )}
                </Field>
              ) : (
                // false
                <Field
                  label={<SpacedLabel text="반려비고" req />}
                  orientation="horizontal"
                >
                  {instk.inputStockNote ? (
                    <Textarea
                      readOnly
                      value={instk.inputStockNote}
                      style={{ maxHeight: "100px", overflowY: "auto" }}
                    />
                  ) : (
                    <Input readOnly value={"내용 없음"} />
                  )}
                </Field>
              )}
            </Stack>
          </DialogBody>
        )}
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

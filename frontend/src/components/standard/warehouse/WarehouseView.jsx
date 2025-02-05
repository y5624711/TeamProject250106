import React from "react";
import { Box, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import { Checkbox } from "../../ui/checkbox.jsx";

function WarehouseView({ warehouseDetail, setWarehouseDetail }) {
  return (
    <Box>
      <Box display="flex" gap={4}>
        <Field label="창고" orientation="horizontal" mb={15}>
          <Input
            value={warehouseDetail.warehouseName}
            onChange={(e) =>
              setWarehouseDetail({
                ...warehouseDetail,
                warehouseName: e.target.value,
              })
            }
          />
        </Field>
        <Field label="창고 코드" orientation="horizontal" mb={15}>
          <Input
            value={warehouseDetail.warehouseCode}
            readOnly
            variant="subtle"
          />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="담당 업체" orientation="horizontal" mb={15}>
          <Input
            value={warehouseDetail.customerName}
            readOnly
            variant="subtle"
          />
        </Field>
        <Field label="업체 코드" orientation="horizontal" mb={15}>
          <Input
            value={warehouseDetail.customerCode}
            onChange={(e) =>
              setWarehouseDetail({
                ...warehouseDetail,
                customerCode: e.target.value,
              })
            }
            variant="subtle"
            readOnly
          />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="관리자" orientation="horizontal" mb={15}>
          <Input
            value={warehouseDetail.employeeName}
            readOnly
            variant="subtle"
          />
        </Field>
        <Field label="사번" orientation="horizontal" mb={15}>
          <Input
            value={warehouseDetail.customerEmployeeNo}
            onChange={(e) =>
              setWarehouseDetail({
                ...warehouseDetail,
                customerEmployeeNo: e.target.value,
              })
            }
            variant="subtle"
            readOnly
          />
        </Field>
      </Box>
      <Field label="전화번호" orientation="horizontal" mb={15}>
        <Input
          value={warehouseDetail.warehouseTel}
          onChange={(e) =>
            setWarehouseDetail({
              ...warehouseDetail,
              warehouseTel: e.target.value,
            })
          }
        />
      </Field>
      <Field label="우편번호" orientation="horizontal" mb={15}>
        <Input
          value={warehouseDetail.warehousePost}
          onChange={(e) =>
            setWarehouseDetail({
              ...warehouseDetail,
              warehousePost: e.target.value,
            })
          }
        />
      </Field>

      <Box display="flex" gap={4}>
        <Field label="광역시도" orientation="horizontal" mb={15}>
          <Input
            value={warehouseDetail.warehouseState}
            onChange={(e) =>
              setWarehouseDetail({
                ...warehouseDetail,
                warehouseState: e.target.value,
              })
            }
          />
        </Field>
        <Field label="시군" orientation="horizontal" mb={15}>
          <Input
            value={warehouseDetail.warehouseCity}
            onChange={(e) =>
              setWarehouseDetail({
                ...warehouseDetail,
                warehouseCity: e.target.value,
              })
            }
          />
        </Field>
      </Box>
      <Field label="주소" orientation="horizontal" mb={15}>
        <Input
          value={warehouseDetail.warehouseAddress}
          onChange={(e) =>
            setWarehouseDetail({
              ...warehouseDetail,
              warehouseAddress: e.target.value,
            })
          }
        />
      </Field>
      <Field label="상세 주소" orientation="horizontal" mb={15}>
        <Input
          value={warehouseDetail.warehouseAddressDetail}
          onChange={(e) =>
            setWarehouseDetail({
              ...warehouseDetail,
              warehouseAddressDetail: e.target.value,
            })
          }
        />
      </Field>
      <Field label="비고" orientation="horizontal" mb={15}>
        <Textarea
          name="warehouseNote"
          style={{ maxHeight: "100px", overflowY: "auto" }}
          placeholder="최대 50자"
          value={warehouseDetail.warehouseNote}
          onChange={(e) =>
            setWarehouseDetail({
              ...warehouseDetail,
              warehouseNote: e.target.value,
            })
          }
        />
      </Field>
      {/*취급 물품<Input>{warehouseDetail.}</Input>*/}
      <Field label="사용 여부" orientation="horizontal" mb={15}>
        <Box ml={"86px"} style={{ position: "absolute" }}>
          <Checkbox
            checked={warehouseDetail.warehouseActive}
            onClick={(e) => {
              setWarehouseDetail({
                ...warehouseDetail,
                warehouseActive: e.target.checked,
              });
            }}
          />
        </Box>
      </Field>
    </Box>
  );
}

export default WarehouseView;

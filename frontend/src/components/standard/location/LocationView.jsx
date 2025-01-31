import React from "react";
import { Box, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";

function LocationView({ locationDetail, setLocationDetail }) {
  const location =
    locationDetail.row +
    " - " +
    locationDetail.col +
    " -  " +
    locationDetail.shelf;

  return (
    <Box>
      <Box display="flex" gap={4}>
        <Field label="창고" orientation="horizontal" mb={15}>
          <Input value={locationDetail.warehouseName} readOnly />
        </Field>
        <Field label="창고 코드" orientation="horizontal" mb={15}>
          <Input
            value={locationDetail.warehouseCode}
            onChange={(e) =>
              setLocationDetail({
                ...locationDetail,
                warehouseCode: e.target.value,
              })
            }
          />
        </Field>
      </Box>
      <Field label="로케이션" orientation="horizontal" mb={15}>
        <Input value={location} readOnly />
      </Field>
      <Box display="flex" gap={20}>
        <Field label="행" orientation="horizontal" mb={15}>
          <Input value={locationDetail.row} readOnly />
        </Field>
        <Field label="열" orientation="horizontal" mb={15}>
          <Input value={locationDetail.col} readOnly />
        </Field>
        <Field label="단" orientation="horizontal" mb={15}>
          <Input value={locationDetail.shelf} readOnly />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="품목" orientation="horizontal" mb={15}>
          <Input value={locationDetail.itemCommonName} readOnly />
        </Field>
        <Field label="품목 코드" orientation="horizontal" mb={15}>
          <Input
            value={locationDetail.itemCommonCode}
            onChange={(e) =>
              setLocationDetail({
                ...locationDetail,
                itemCommonCode: e.target.value,
              })
            }
          />
        </Field>
      </Box>
      <Field label="비고" orientation="horizontal" mb={15}>
        <Textarea
          placeholder="최대 50자"
          style={{ maxHeight: "100px", overflowY: "auto" }}
          value={locationDetail.locationNote}
          onChange={(e) =>
            setLocationDetail({
              ...locationDetail,
              locationNote: e.target.value,
            })
          }
        />
      </Field>
    </Box>
  );
}

export default LocationView;

import React from "react";
import { Box, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import { Checkbox } from "../../ui/checkbox.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

function LocationView({ locationDetail, setLocationDetail, locationKey }) {
  const location =
    locationDetail.row +
    " - " +
    locationDetail.col +
    " - " +
    locationDetail.shelf;

  return (
    <Box>
      <Box display="flex" gap={5}>
        <Field
          label={<SpacedLabel text="담당 업체" />}
          orientation="horizontal"
          mb={15}
        >
          <Input
            value={locationDetail.customerName}
            variant="subtle"
            readOnly
          />
        </Field>
        <Field
          label={<SpacedLabel text="창고" />}
          orientation="horizontal"
          mb={15}
        >
          <Input
            value={locationDetail.warehouseName}
            variant="subtle"
            readOnly
          />
        </Field>
      </Box>
      {locationDetail.serialNo == null ? (
        <Field
          label={<SpacedLabel text="품목" />}
          orientation="horizontal"
          mb={15}
        >
          <Input value={locationDetail.itemName} variant="subtle" readOnly />
        </Field>
      ) : (
        <Box display="flex" gap={5}>
          <Field
            label={<SpacedLabel text="품목" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={locationDetail.itemName} variant="subtle" readOnly />
          </Field>
          <Field
            label={<SpacedLabel text="시리얼 번호" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={locationDetail.serialNo} variant="subtle" readOnly />
          </Field>
        </Box>
      )}
      <Field
        label={<SpacedLabel text="로케이션" />}
        orientation="horizontal"
        mb={15}
      >
        <Input value={location} readOnly variant="subtle" />
      </Field>
      <Field
        label={<SpacedLabel text="비고" />}
        orientation="horizontal"
        mb={15}
      >
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
      <Field
        label={<SpacedLabel text="재고 여부" />}
        orientation="horizontal"
        mb={15}
      >
        <Box ml={"92px"} style={{ position: "absolute" }}>
          <Checkbox checked={locationDetail.located} />
        </Box>
      </Field>
      <Field
        label={<SpacedLabel text="사용 여부" />}
        orientation="horizontal"
        mb={15}
      >
        <Box ml={"92px"} style={{ position: "absolute" }}>
          <Checkbox
            checked={locationDetail.locationActive}
            onClick={(e) => {
              setLocationDetail({
                ...locationDetail,
                locationActive: e.target.checked,
              });
            }}
          />
        </Box>
      </Field>
    </Box>
  );
}

export default LocationView;

import React, { useState } from "react";
import { Box, Center, HStack, Stack, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";
import LocationDetail from "./LocationDetail.jsx";
import LocationListPage from "./LocationListPage.jsx";

function LocationList({
  locationList,
  countLocation,
  useColumn,
  currentPage,
  handlePageChangeClick,
}) {
  const navigate = useNavigate();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedLocationKey, setSelectedLocationKey] = useState(null);

  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader width="100px">#</Table.ColumnHeader>
                <Table.ColumnHeader width="200px">창고명</Table.ColumnHeader>
                <Table.ColumnHeader width="150px">담당 업체</Table.ColumnHeader>
                <Table.ColumnHeader width="200px">업체 직원</Table.ColumnHeader>
                <Table.ColumnHeader width="150px">광역 시도</Table.ColumnHeader>
                <Table.ColumnHeader width="150px">시군</Table.ColumnHeader>
                <Table.ColumnHeader width="200px">전화번호</Table.ColumnHeader>
                {useColumn ? (
                  <Table.ColumnHeader>사용 여부</Table.ColumnHeader>
                ) : null}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {locationList.map((location) => (
                <LocationListPage
                  location={location}
                  useColumn={useColumn}
                  setSelectedLocationKey={setSelectedLocationKey}
                  setIsDetailDialogOpen={setIsDetailDialogOpen}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Center>
          <PaginationRoot
            onPageChange={handlePageChangeClick}
            count={countLocation}
            pageSize={10}
            // page={page}
            siblingCount={2}
            defaultPage={currentPage}
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Center>
        <LocationDetail
          locationKey={selectedLocationKey}
          isOpened={isDetailDialogOpen}
          onClosed={() => setIsDetailDialogOpen(false)}
        />
      </Stack>
    </Box>
  );
}

export default LocationList;

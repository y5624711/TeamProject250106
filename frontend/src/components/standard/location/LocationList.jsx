import React, { useState } from "react";
import { Box, Center, HStack, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";
import LocationDetail from "./LocationDetail.jsx";
import LocationListPage from "./LocationListPage.jsx";
import { LowColumnSort } from "./LowColumnSort.jsx";

function LocationList({
  locationList,
  countLocation,
  currentPage,
  handlePageChangeClick,
  setSearchParams,
  refresh,
  setSearch,
  search,
}) {
  const navigate = useNavigate();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedLocationKey, setSelectedLocationKey] = useState(null);

  // 정렬 헤더
  const sortOptions = [
    { key: "warehouseName", label: "창고" },
    { key: "row", label: "행" },
    { key: "col", label: "열" },
    { key: "shelf", label: "단" },
    { key: "located", label: "재고 여부" },
  ];

  return (
    <Box>
      <Box>
        <Table.Root interactive>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
              <LowColumnSort
                firstColumn={"locationKey"}
                sortOptions={sortOptions}
                onSortChange={(nextSearchParam) => {
                  setSearchParams(nextSearchParam);
                  const searchString = nextSearchParam.toString(); // 예: "type=all&keyword=test&sort=locationKey"
                  const sortMatch = searchString.match(/sort=([^&]*)/);
                  const orderMatch = searchString.match(/order=([^&]*)/);
                  setSearch({
                    ...search,
                    order: orderMatch[1],
                    sort: sortMatch[1],
                  });
                }}
                defaultSortKey={"locationKey"}
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {locationList.map((location, index) => (
              <LocationListPage
                key={location.locationKey}
                index={index}
                location={location}
                setSelectedLocationKey={setSelectedLocationKey}
                setIsDetailDialogOpen={setIsDetailDialogOpen}
              />
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <Center w="100%" p={4}>
        <PaginationRoot
          onPageChange={handlePageChangeClick}
          count={countLocation}
          pageSize={10}
          page={currentPage}
          siblingCount={2}
          defaultPage={currentPage}
          variant="solid"
          size={"md"}
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
        refresh={refresh}
      />
    </Box>
  );
}

export default LocationList;

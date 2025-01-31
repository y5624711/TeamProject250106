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
import { Sort } from "../../tool/list/Sort.jsx";

function LocationList({
  locationList,
  countLocation,
  currentPage,
  handlePageChangeClick,
  setSearchParams,
}) {
  const navigate = useNavigate();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedLocationKey, setSelectedLocationKey] = useState(null);

  // 정렬 헤더
  const sortOptions = [
    { key: "locationKey", label: "#" },
    { key: "warehouseName", label: "창고" },
    { key: "row", label: "행" },
    { key: "col", label: "열" },
    { key: "shelf", label: "단" },
    { key: "itemCommonName", label: "품목" },
    { key: "locationNote", label: "비고" },
  ];

  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root interactive>
            <Table.Header>
              <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
                <Sort
                  sortOptions={sortOptions}
                  onSortChange={(nextSearchParam) =>
                    setSearchParams(nextSearchParam)
                  }
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {locationList.map((location, index) => (
                <LocationListPage
                  index={(currentPage - 1) * 10 + index}
                  location={location}
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

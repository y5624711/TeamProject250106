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
          <Table.Root interactive showColumnBorder>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader
                  width="100px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  #
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="200px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  창고명
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="150px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  행
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="200px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  열
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="150px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  단
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="150px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  품목명
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="200px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  비고
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {locationList.map((location) => (
                <LocationListPage
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

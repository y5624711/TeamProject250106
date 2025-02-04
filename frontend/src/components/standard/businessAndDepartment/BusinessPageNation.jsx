import { Center, HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";

export function BusinessPageNation({ page, count, handlePageChange }) {
  return (
    <Center>
      <PaginationRoot
        size={"md"}
        onPageChange={handlePageChange}
        count={count}
        pageSize={5}
        page={page}
        variant="solid"
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Center>
  );
}

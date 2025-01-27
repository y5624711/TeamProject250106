import React from "react";
import { useParams } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";

function MemberInfo() {
  const { id } = useParams();

  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Box
        w="500px"
        h="400px"
        border="1px solid black"
        bg="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center" // 가운데 정렬
      >
        <Field label={"이름"}></Field>
        <Field label={"이름"}></Field>
        <Field label={"이름"}></Field>
      </Box>
    </Flex>
  );
}

export default MemberInfo;

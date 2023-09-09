import { Box, Image, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { TodoCard } from "../TodoCard";

export const BoardCard = ({ headerText, headingColor, boardBg, data = [] }) => {
  return (
    <Box width="100%">
      <HStack alignItems="center" bg={headingColor} px={6} py={4} spacing={2}>
        <Image borderRadius="full" boxSize="1.5rem" src="/static/icons/BsFillSunFill.svg" alt="BsFillSunFill" />
        <Heading size="sm" color="white">
          {headerText}
        </Heading>
      </HStack>
      {data.length > 0 ? (
        <VStack background={boardBg} height="100vh" justifyContent="start" p={6} spacing="1rem">
          {data.map((item, i) => (
            <TodoCard id={item.id} title={item.task_name} description={item.task_description} status={item?.task_status} key={i} />
          ))}
        </VStack>
      ) : (
        <VStack background={boardBg} height="100vh" justifyContent="center" p={6} spacing={4}>
          <Box display="flex" justifyContent="center">
            <Image boxSize="5rem" src="/static/icons/update-icon.svg" alt="Update Icon" />
          </Box>
          <VStack spacing={0}>
            <Text align="center">Belum ada tugas</Text>
            <Text align="center">Segera tambahkan tugas baru kamu sekarang!</Text>
          </VStack>
        </VStack>
      )}
    </Box>
  );
};

// Define PropTypes for your component
BoardCard.propTypes = {
  headerText: PropTypes.string.isRequired, // 'headerText' is required and must be a string
  headingColor: PropTypes.string.isRequired, // 'headingColor' is required and must be a string
  boardBg: PropTypes.string, // 'boardBg' is required and must be a string
  data: PropTypes.array.isRequired, // 'data' is required and must be an array
};

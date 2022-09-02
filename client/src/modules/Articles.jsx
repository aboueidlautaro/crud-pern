import React from "react";
import Fav from "../components/Fav";
import { Link, Box, Skeleton, Text } from "@chakra-ui/react";

import "../services/config";

function Articles({ results = [], loading }) {
  return (
    <>
      <Box
        minH="full"
        h="auto"
        w="90%"
        paddingY="20px"
        style={{
          columns: "5 280px",
          margin: "auto",
        }}
      >
        {results.map((result) => (
          <Skeleton
            startColor="blue.500"
            borderRadius={7}
            margin={2}
            endColor="purple.500"
            isLoaded={!loading}
            key={result.id}
          >
            <Box
              position="relative"
              w="280px"
              h="auto"
              border="4px"
              borderColor="#000"
            >
              <Link
                _hover={{ opacity: "45%" }}
                key={result.id}
                id={result.id}
                padding="10px"
              >
                <Text as="b">{result.title}</Text>
              </Link>
              <Box position="absolute" top="0px" right="0px">
                <Fav id={result.id} />
              </Box>
            </Box>
          </Skeleton>
        ))}
      </Box>
    </>
  );
}

export default Articles;

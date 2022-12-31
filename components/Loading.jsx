import React from 'react'
import { Box } from '@chakra-ui/react'
import { BeatLoader } from "react-spinners";

function Loading({ isLoading }) {
  return (
      <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={500}
      >
          <BeatLoader color={"#0bb5df"} loading={isLoading} size={20} />
      </Box>
  )
}

export default Loading
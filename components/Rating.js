import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"

function Rating({rating, size}) {
  return (
    <CircularProgress
      ms="3"
      size={size}
      max={10}
      value={rating}
      color="teal"
      position="absolute"
      bottom="-15px"
      borderRadius="30"
      background="chakra-body-bg"
    >
      <CircularProgressLabel fontSize="xs">
        {Math.floor(rating)}%
      </CircularProgressLabel>
    </CircularProgress>

  )
}

export default Rating
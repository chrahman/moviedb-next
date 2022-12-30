import { Icon, Box } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

function Rating({rating10}) {
  let rating = Math.floor(rating10 / 2);
  return (
    <Box py="3">
        Rating:
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
                <Icon
                    key={i}
                    as={FaStar}
                    aria-label={`Rating: ${ratingValue}`}
                    color={ratingValue <= rating ? "orange" : "gray"}
                />
            );
        })}
    </Box>
  );
}

export default Rating;
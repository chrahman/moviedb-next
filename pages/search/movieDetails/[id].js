import { Box, Button, CircularProgress, CircularProgressLabel, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetail } from "../../../store/reducers/apiSlice";
import Head from "next/head";
import { BeatLoader } from "react-spinners";

index.getInitialProps = async ({ query }) => {
  const { id } = query;

  return { id };
};

function index({ id }) {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.api.movieDetail);
  const isLoading = useSelector((state) => state.api.isLoading);

  useEffect(() => {
    dispatch(getMovieDetail(id));
  }, [dispatch]);
    
    console.log(details);

  return (
    <>
      <Head>
        <title>Movie Details</title>
      </Head>
      {isLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={500}
        >
          <BeatLoader color={"#0bb5df"} loading={isLoading} size={20} />
        </Box>
      ) : (
        Object.keys(details).length !== 0 && (
            <Grid
                templateAreas={{ md: `"nav main"`, base: `"nav" "main"` }}
                // gridTemplateRows={"50px 1fr 30px"}
                gridTemplateColumns={{ md: "350px 1fr", base: "1fr" }}
                gap="10"
                fontWeight="bold"
                py="10"
            >
                <GridItem
                p="3"
                borderRadius="md"
                bg="chakra-body-bg"
                shadow="xl"
                border="1px solid"
                borderColor="gray.200"
                area={"nav"}
                >
                <Image
                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    alt={details.title}
                    borderRadius="base"
                    onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://via.placeholder.com/500x750";
                    }}
                />
                </GridItem>
                <GridItem
                p="5"
                borderRadius="md"
                bg="chakra-body-bg"
                shadow="xl"
                border="1px solid"
                borderColor="gray.200"
                area={"main"}
                >
                    <Heading as="h5" size="lg" pt="1">
                        {details.title || details.orignal_title}{" "}
                        <Text as="span" fontWeight="light">{`(${new Date(details.release_date).getFullYear()})`}</Text>
                    </Heading>
                    
                    <Text as="p" size="xs" fontWeight="light">{details.tagline}</Text>
                    
                    <Text as="p" fontSize="small" fontWeight="light" py="3">{`${details.status}: ${new Date(details.release_date).toLocaleDateString()}`}</Text>
                    
                    <Grid gap="3" gridAutoFlow={{sm:"column", base:"row"}} width="fit-content">
                        {details.genres.map((genre, index) => (
                            <Button as="span" key={index} colorScheme='teal' size='xs'>
                                {genre.name}
                            </Button>
                        ))}
                    </Grid>
                    
                    <Heading as="h5" size="md" py="5" display="flex">
                        User <br/> Score
                        <CircularProgress ms="3" size="50px" max={10} value={details.vote_average} color="teal" >
                            <CircularProgressLabel>{Math.floor(details.vote_average)}%</CircularProgressLabel>
                        </CircularProgress>
                    </Heading>
                    
                    <Heading as="h5" size="md" py="5">
                        Lenguage:{" "}
                        <Text as="span" fontWeight="light">{details.original_language}</Text>
                    </Heading>

                    <Heading as="h5" size="md" py="5">
                        Overview
                    </Heading>
                    <Text>
                        {details.overview ||
                        "We don't have an overview translated in English. Help us expand our database by adding one."}
                    </Text>
                    {/* <Heading as="h5" size="md" py="5">
                        Known For
                    </Heading>
                    <Text>{details.known_for_department}</Text> */}
                </GridItem>
            </Grid>
        )
      )}
    </>
  );
}

export default index;

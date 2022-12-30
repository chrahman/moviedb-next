import { Box, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPeopleDetail } from "../../store/reducers/apiSlice";
import Head from "next/head";
import { BeatLoader } from "react-spinners";

index.getInitialProps = async ({ query }) => {
  const { id } = query;

  return { id };
};

function index({ id }) {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.api.peopleDetail);
  const isLoading = useSelector((state) => state.api.isLoading);

  useEffect(() => {
    dispatch(getPeopleDetail(id));
  }, [dispatch]);

  return (
    <>
        <Head>
            <title>Popular People Details</title>
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
        ) :
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
                    src={`https://image.tmdb.org/t/p/w500${details.profile_path}`}
                    alt={details.name}
                    borderRadius="base"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "https://via.placeholder.com/500x750";
                    }}
                />
                <Heading as="h5" size="lg" pt="10">
                    {details.name}
                </Heading>
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
                <Heading as="h5" size="md" py="5">
                    Bio Graphy
                </Heading>
                <Text>{details.biography}</Text>
                <Heading as="h5" size="md" py="5">
                    Known For
                </Heading>
                <Text>{details.known_for_department}</Text>
                <Heading as="h5" size="md" py="5">
                    Birthday
                </Heading>
                <Text>{details.birthday}</Text>
                <Heading as="h5" size="md" py="5">
                    Place of Birth
                </Heading>
                <Text>{details.place_of_birth}</Text>
                <Heading as="h5" size="md" py="5">
                    Popularity
                </Heading>
                <Text>{details.popularity}</Text>
                <Heading as="h5" size="md" py="5">
                    Also Known As
                </Heading>
                {details.also_known_as?.map((name, index) => (
                <Text key={index}>{name}</Text>
                ))}
            </GridItem>
            </Grid>
        )}
    </>
  );
}

export default index;

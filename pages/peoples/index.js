import {Box, Card, CardBody, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPeoples } from "../../store/reducers/apiSlice";
import Head from "next/head";
import Link from "next/link";
import { BeatLoader } from "react-spinners";

function index() {
  const dispatch = useDispatch();
  const allPeoples = useSelector((state) => state.api.peoples.results);
  const isLoading = useSelector((state) => state.api.isLoading);

  useEffect(() => {
    dispatch(getPeoples());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Popular Peoples</title>
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
      allPeoples && (
        <>
          <Heading as="h3" size="md" my="6">
            Popular Peoples
          </Heading>
          <Grid
            templateColumns={{
              md: "repeat(5, 1fr)",
              sm: "repeat(3, 1fr)",
              base: "repeat(1, 1fr)",
            }}
            gap={6}
            mt="3"
          >
            {allPeoples?.map((people) => (
              <GridItem colSpan={1} key={people.id}>
                <Card shadow="xl" border="1px solid" borderColor="gray.200">
                  <CardBody>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${people.profile_path}`}
                      alt={people.name}
                      borderRadius="base"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "https://via.placeholder.com/500x750";
                      }}
                    />
                    <Link href={`/peoples/${people.id}`}>
                      <Heading as="h5" size="md" pt="1">
                        {people.name}
                      </Heading>
                    </Link>
                    <Text>{people.known_for_department}</Text>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default index;

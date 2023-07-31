import {Box, Card, CardBody, Grid, GridItem, Heading, Image, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPeoples, reset } from "../../store/reducers/apiSlice";
import Head from "next/head";
import Link from "next/link";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";

function index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const allPeoples = useSelector((state) => state.api.peoples);
  const isLoading = useSelector((state) => state.api.isLoading);

  const [page, setPage] = useState(1);
  const totalPages = allPeoples.total_pages;

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(reset());
    dispatch(getPeoples(page));
  }, [dispatch, page]);

  

  return (
    <>
      <Head>
        <title>Popular Peoples</title>
      </Head>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) :
        allPeoples.results && (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="start">
            <Heading as="h3" size="md" my="6">
              Popular Peoples
            </Heading>
            <Button colorScheme="teal" variant="outline" size="sm" mt="5" ml="5" onClick={()=>router.back()}>
                <AiOutlineArrowLeft/> Back
            </Button>
          </Box>
            <Grid
              templateColumns={{
                md: "repeat(5, 1fr)",
                sm: "repeat(3, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              gap={6}
              mt="3"
            >
              {allPeoples.results?.map((people) => (
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
        )
      }
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
    </>
  );
}

export default index;

import {Box, Card, CardBody, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTvShows, reset } from "../../store/reducers/apiSlice";
import Head from "next/head";
import Link from "next/link";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

function index() {
  const dispatch = useDispatch();
  const tvShows = useSelector((state) => state.api.tvShows);
  const isLoading = useSelector((state) => state.api.isLoading);

  const [page, setPage] = useState(1);
  const totalPages = tvShows.total_pages;

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(reset());
    dispatch(getTvShows());
  }, [dispatch, page]);

  return (
    <>
      <Head>
        <title>Tv Shows</title>
      </Head>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) :
      tvShows.results && (
        <>
          <Heading as="h3" size="md" my="6">
            TV Shows
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
            {tvShows.results?.map((movie) => (
              <GridItem colSpan={1} key={movie.id} display="inline-flex">
                <Card shadow="xl" border="1px solid" borderColor="gray.200">
                  <CardBody>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.name}
                      borderRadius="base"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "https://via.placeholder.com/500x750";
                      }}
                    />
                    <Box pt="2">
                      <Link href={`/tvShows/${movie.id}`}>
                        <Heading as="h5" size="sm" pt="1">
                          {movie.title || movie.name}
                        </Heading>
                      </Link>
                      <Text color="gray" fontSize="small" pt="2">{movie.release_date && new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || movie.first_air_date && new Date(movie.first_air_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
    </>
  );
}

export default index;

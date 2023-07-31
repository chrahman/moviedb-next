import { Box, Card, CardBody, Grid, GridItem, Heading, Image, Text, Button } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendings, reset } from "../../store/reducers/apiSlice";
import Head from "next/head";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import Pagination from "../../components/Pagination";

function index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const trendingMovies = useSelector((state) => state.api.movies);
  const isLoading = useSelector((state) => state.api.isLoading);
  
  const [page, setPage] = useState(1);
  const totalPages = trendingMovies.total_pages > 500 ? 500 : trendingMovies.total_pages;

  const handlePageChange = (page) => {
    setPage(page);
  };


  useEffect(() => {
    dispatch(reset());
    dispatch(getTrendings(page));
  }, [dispatch, page]);

  return (
    <>
      <Head>
        <title>Trending Movies</title>
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
      trendingMovies.results && (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Heading as="h3" size="md" my="6">
              Trending Movies
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
            {trendingMovies.results?.map((movie) => (
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
                      <Link href={`/trending/${movie.id}`}>
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

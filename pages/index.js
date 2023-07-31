import {Box, Card, CardBody, Grid, GridItem, Heading, Image, Text, FormControl, Input, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, reset } from "../store/reducers/apiSlice";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import Rating from "../components/Rating";

function Home() {
    const dispatch = useDispatch();
    const router = useRouter();
    const toast = useToast();

    const discoverMovies = useSelector((state) => state.api.movies);
    const isLoading = useSelector((state) => state.api.isLoading);
    const isError = useSelector((state) => state.api.error);

    const [page, setPage] = useState(1)
    const totalPages = discoverMovies.total_pages > 500 ? 500 : discoverMovies.total_pages;

    const handlePageChange = (page) => {
        setPage(page)
    }

    useEffect(() => {
        dispatch(reset());
        console.log(page)
        dispatch(getMovies(page));
    }, [dispatch, page]);


    const handleSubmit = (e) => {
        if (e.target.search.value === "") {
            e.preventDefault();
            toast({
                title: "Error",
                description: "Please enter a movie title.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
        else {
            e.preventDefault();
            router.push(`/search/${e.target.search.value}`);
            // console.log(e.target.search.value);
        }
    }
    
    console.log(discoverMovies)

    return (
        <>
            <Head>
                <title>MovieDB App in Next.js</title>
                <meta name="description" content="MovieDB App in Next.js" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) :
                discoverMovies.results && (
                    <>
                        <Box
                            py={10}
                            display="flex"
                            // alignItems="center"
                            flexDirection="column"
                        >
                            <Heading size="xl">
                                Welcome to the MovieDB
                            </Heading>
                            <Box as="form" width={{md:"450px", base:"100%"}} mt="5" onSubmit={handleSubmit}>
                                <FormControl position="relative">
                                    <Input
                                        name="search"
                                        type="text"
                                        borderRadius="30"
                                        id="search"
                                        placeholder="Enter movie title..."
                                        outline="none"
                                        borderColor="brand.500"
                                    />
                                    <Button colorScheme="brand" mt={4} position="absolute" bottom="0" right="0" borderRadius="30" zIndex="1" type="submit">
                                        Search
                                    </Button>
                                </FormControl>
                            </Box>
                        </Box>

                        <Heading as="h3" size="md" my="6">
                            Discover All Movies
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
                            {discoverMovies.results?.map((movie) => (
                                <GridItem colSpan={1} key={movie.id} display="inline-flex">
                                    <Card shadow="xl" border="1px solid" borderColor="gray.200">
                                        <CardBody>
                                            <Box position="relative">
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    alt={movie.name}
                                                    borderRadius="base"
                                                    onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = "https://via.placeholder.com/500x750";
                                                    }}
                                                />
                                                <Rating rating={movie.vote_average} size="10" />
                                            </Box>
                                            <Box pt="5">
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

                        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    </>
                )
            }
        </>
    );
}

export default Home;

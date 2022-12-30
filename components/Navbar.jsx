import React from "react";
import Link from "next/link";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  useColorMode,
  Container
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import Image from "next/image";
import Logo from "../assets/Logo.svg";

const Navbar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode("dark");

  return (
    <>
      <Container maxW="full" shadow="md" px={{ md: "7", base: "2" }} borderBottom="1px solid" borderColor="gray.200">
        <chakra.header
          bg={bg}
          py={4}
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Flex>
                <chakra.h1
                  fontSize="xl"
                  fontWeight="bold"
                  color="gray.600"
                  alignSelf="center"
                  _dark={{
                    color: "white",
                    _hover: {
                      color: "gray.300",
                    },
                  }}
                  _hover={{
                    color: "gray.700",
                  }}
                >
                  <Link href="/">
                      <Image src={Logo} alt="logo" width={140} height={40} />
                  </Link>
                </chakra.h1>
              <HStack
                spacing={3}
                mr={1}
                color="brand"
                display={{ base: "none", md: "inline-flex" }}
                ms="5"
              >
                <Link href="/">
                  <Button variant="ghost">Home</Button>
                </Link>

                <Link href="/trending">
                  <Button variant="ghost">Trending</Button>
                </Link>

                <Link href="/upcoming">
                  <Button variant="ghost">Upcoming</Button>
                </Link>

                <Link href="/tvShows">
                  <Button variant="ghost">TV Shows</Button>
                </Link>

                <Link href="/peoples">
                  <Button variant="ghost">Peoples</Button>
                </Link>
              </HStack>
            </Flex>
            <HStack display="flex" alignItems="center" spacing={1}>
              
              <Button colorScheme="brand" size="sm" fontSize="18" onClick={toggleColorMode} title={colorMode === "light" ? "Dark Mode": "Light Mode"}>
                {colorMode === "light" ? <BsMoon /> : <BsSun /> }
              </Button>

              <Box display={{ base: "inline-flex", md: "none" }}>
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color="gray.800"
                  _dark={{ color: "inherit" }}
                  variant="ghost"
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />

                <VStack
                  pos="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  p={2}
                  pb={4}
                  m={2}
                  bg={bg}
                  spacing={3}
                  rounded="sm"
                  shadow="lg"
                  zIndex="999"
                >
                  <CloseButton
                    aria-label="Close menu"
                    onClick={mobileNav.onClose}
                  />

                  <Link href="/">
                    <Button variant="ghost" onClick={mobileNav.onClose}>
                      Home
                    </Button>
                  </Link>

                  <Link href="/trending">
                    <Button variant="ghost" onClick={mobileNav.onClose}>
                      Trending Movies
                    </Button>
                  </Link>

                  <Link href="/upcoming">
                    <Button variant="ghost" onClick={mobileNav.onClose}>
                      Upcoming Movies
                    </Button>
                  </Link>

                  <Link href="/tvShows">
                    <Button variant="ghost" onClick={mobileNav.onClose}>
                      TV Shows
                    </Button>
                  </Link>

                  <Link href="/peoples">
                    <Button variant="ghost" onClick={mobileNav.onClose}>
                      Peoples
                    </Button>
                  </Link>
                </VStack>
              </Box>

            </HStack>
          </Flex>
        </chakra.header>
      </Container>
    </>
  );
};
export default Navbar;

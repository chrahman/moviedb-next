import { Box, Button, Flex, Input, Text, InputGroup, InputRightAddon, InputLeftAddon, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"

function Pagination({ page, totalPages, onPageChange }) {
    const [inputPage, setInputPage] = useState(page);
    const toast = useToast();

    const onFormSubmit = (e) => {
        e.preventDefault();

        let input = document.getElementById("page-number");
        if (input.value === "") {
            toast({
                title: "Error",
                description: "The page number cannot be empty",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
        else {
            onPageChange(inputPage);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page])

    return (
        <Flex alignItems="center" justifyContent="space-between" mt="10">
            <Button
                onClick={() => {
                    onPageChange(page - 1)
                    setInputPage(inputPage - 1)
                }}
                isDisabled={page === 1}
                borderRadius="0"
                size={{ base: "sm", md: "md" }}
                colorScheme="brand"
            >
                Previous
            </Button>
            <Box mx={2} as="form" onSubmit={onFormSubmit}>
                <InputGroup size='sm'>
                    <InputLeftAddon children='Page' />
                    <Input
                        type="number"
                        id="page-number"
                        name="page-number"
                        min={1}
                        max={totalPages}
                        value={inputPage || ""}
                        onChange={(event) => setInputPage(Number(event.target.value || ""))}
                        textAlign="center"
                    />
                    <InputRightAddon children={`of ${totalPages}`} />
                </InputGroup>
            </Box>
            <Button
                onClick={() => {
                    onPageChange(inputPage + 1)
                    setInputPage(inputPage + 1)
                }}
                isDisabled={page === totalPages}
                borderRadius="0"
                size={{ base: "sm", md: "md" }}
                colorScheme="brand"
            >
                Next
            </Button>
        </Flex>
    )
}

export default Pagination;
import { Container } from '@chakra-ui/react'
import {useEffect} from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

function index({ children }) {
    const toast = useToast()
    const isError = useSelector((state) => state.api.error);

    useEffect(() => {
      if (isError.message) {
        toast({
          title: "Error",
          description: isError.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }, [isError.message]);

    return (
        <>
            <Navbar />
            <Container maxW="full" px={{md:"7", base:"2"}} minHeight="500">
                {children}
            </Container>
            <Footer/>
        </>
  )
}

export default index
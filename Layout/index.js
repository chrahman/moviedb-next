import { Container } from '@chakra-ui/react'
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function index({children}) {
    return (
        <>
            <Navbar />
            <Container maxW="full" px={{md:"7", base:"2"}}>
                {children}
            </Container>
            <Footer/>
        </>
  )
}

export default index
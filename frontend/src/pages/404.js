import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function NotFound() {
    return (
        <>
            <Header/>
            <Container>
                <h1>This page could not be found</h1>
            </Container>
            <Footer/>
        </>
    )
}
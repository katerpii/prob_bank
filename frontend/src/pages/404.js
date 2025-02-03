import { Container } from 'react-bootstrap'

export default function NotFound() {
    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
                <h1 style={{ 
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    color: '#2c3e50',
                    fontWeight: '500'
                }}>
                    This page could not be found
                </h1>
            </Container>
        </>
    )
}
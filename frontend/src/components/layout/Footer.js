import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col> Footer </Col>
                </Row>
                <hr />
            </Container>
        </footer>
    )
}
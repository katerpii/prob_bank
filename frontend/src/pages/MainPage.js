import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Profile from '../components/profile/UserProfile'
import '../styles/MainPage.css'

export default function Main() {
    return (
        <Container className="container">
            <Row>
                {/* 왼쪽 열 */}
                <Col 
                    lg={4} // 큰 화면(lg)에서는 4 칸 차지
                    className="d-none d-lg-block left" // d-none: 작은 화면에서는 숨김, d-lg-block: lg 이상 화면에서 block 표시
                    style={{backgroundColor: '#F78181'}}
                >
                    {/* 왼쪽 콘텐츠 */}
                    왼쪽 영역
                    <Profile />
                    Test
                </Col>
                {/* 오른쪽 열 */}
                <Col 
                    lg={8} // 큰 화면에서 8 칸 차지
                    xs={12} // 작은 화면(xs)에서는 12 칸(전체 너비) 차지
                    className="right"
                    style={{backgroundColor: '#81F7F3'}}
                >
                    {/* 오른쪽 콘텐츠 */}
                    오른쪽 영역
                </Col>
            </Row>
        </Container>
    )
}
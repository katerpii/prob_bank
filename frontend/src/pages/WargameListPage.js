// WargameListPage.js (예시)
import { useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ChallengeRow from '../components/challenge/ChallengeRow' // 재사용

export default function WargameListPage() {
    const [wargames, setWargames] = useState([])
    const [totalWargames, setTotalWargames] = useState(0)

    useEffect(() => {
        const fetchWargames = async () => {
            try {
                const response = await fetch('http://localhost:3030/wargame/list')
                const data = await response.json()
                setWargames(data.challenge)  // 예시
                setTotalWargames(data.challenge.length)
            } catch (error) {
                console.error('워게임 목록을 불러오는데 실패했습니다:', error)
            }
        }

        fetchWargames()
    }, [])

    return (
        <>
            <Row>
                <Col left-col col-md={8} style={{ backgroundColor: '#F78181' }}>
                    <div className="wargame-challenges">
                        {/* ...필터나 검색 등등... */}
                        <div className="split">
                            <h3 style={{ fontSize: '1rem' }}>
                                <span>
                                    총 
                                    <span className="total-problem-amount">
                                        <span>{totalWargames}</span>
                                    </span>
                                    개의 문제가 있습니다.
                                </span>
                            </h3>
                            <div className="dropdown">
                                <Button>
                                    <span> 최신순 </span>
                                </Button>
                            </div>
                        </div>

                        <div className="challenges-list">
                            <div className="headers">
                                <div className="list-header"> 문제 정보 </div>
                                <div className="list-header"> 풀이 수 </div>
                                <div className="list-header"> 출제자 </div>
                            </div>
                            {wargames.map((challenge) => (
                                // prefix="wargame"를 넘겨주면 /wargame/:id 라우트로 이동
                                <ChallengeRow key={challenge.id} problem={challenge} prefix="wargame" />
                            ))}
                        </div>
                    </div>
                </Col>
                <Col Right-col col-md={4} style={{ backgroundColor: '#81F7F3' }}>
                    <div className="create-challenge">
                        <div className="promoto-title">
                            <span>
                                새로운 워게임 아이디어가 있으신가요?
                                <br />
                                여러분들의 멋진 문제를 공개해주세요!
                            </span>
                            <Link to="/wargame/new">
                                워게임 만들기 &gt;
                            </Link>
                        </div>
                    </div>
                    {/* ...뭔가 다른 사이드 컨텐츠... */}
                </Col>
            </Row>
        </>
    )
}
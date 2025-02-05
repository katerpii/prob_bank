import { useState, useEffect } from "react"
import { Button, Col, Row } from "react-bootstrap"
import ChallengeRow from "../components/challenge/ChallengeRow"
import { Link } from "react-router-dom"
import "../styles/AlgorithmListPage.css"

export default function AlgorithmListPage() {
    const [challenges, setChallenges] = useState([])
    const [totalChallenges, setTotalChallenges] = useState(0)

    useEffect(() => {
        // API 호출 예시
        const fetchProblems = async () => {
            try {
                const response = await fetch('http://localhost:3030/algorithm/challenge/list')
                const data = await response.json()
                setChallenges(data.challenge)
                setTotalChallenges(data.challenge.length) // 총 개수를 totalchallenges에 설정
            } catch (error) {
                console.error('문제 목록을 불러오는데 실패했습니다:', error)
            }
        }

        fetchProblems()
    }, [])

    return (
        <>
            <Row>
                <Col left-col col-md={8} style={{backgroundColor: '#F78181'}}>
                    <div className="algorithm-challenges">
                        <div className="challenge-filter">
                            <div className="input-search">
                                <input type="text" placeholder="찾고 싶은 문제를 검색하세요."/>
                            </div>
                            <div className="desktop-filter">
                                <div className="filter-key difficulty"> 난이도 </div>
                                <div className="filter-section"></div>
                            </div>
                            <div className="desktop-filter">
                                <div className="filter-key status"> 풀이 여부 </div>
                                <div className="filter-section"></div>
                            </div>
                        </div>
                        <div className="split">
                            <h3 style={{ fontSize: '1rem' }}>
                                <span>총 
                                    <span className="total-problem-amount">
                                        <span>{totalChallenges}</span>
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
                            {challenges.map((challenge) => (
                                <ChallengeRow key={challenge.id} problem={challenge} prefix="algorithm"/>
                            ))}
                        </div>
                    </div>
                </Col>
                <Col Right-col col-md={4} style={{backgroundColor: '#81F7F3'}}>
                    <div className="create-challenge">
                        <div className="promoto-title">
                            <span className="">
                                기발한 아이디어가 있으신가요?
                                <br/>
                                여러분들의 멋진 문제를 공개해주세요!
                            </span>
                            <Link to="/algorithm/challenges/new">
                                알고리즘 문제 출제하기 &gt;
                            </Link>
                        </div>
                    </div>
                    <div className="challenge-ranking">
                        <h2> 알고리즘 TOP 10 </h2>
                    </div>
                </Col>
            </Row>
        </>
    )
}
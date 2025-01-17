import { Col, Row } from "react-bootstrap";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function AlgorithmListPage() {
    return (
        <>
            <Header/>
                <Row>
                    <Col left sm={8}>
                        <div className="algorithm-challenges">
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
                    </Col>
                </Row>
            <Footer/>
        </>
    )
}
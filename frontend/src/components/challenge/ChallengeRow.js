// ChallengeRow.js (수정본)
import { Link } from 'react-router-dom'

export default function ChallengeRow({ problem, prefix }) {
    // 만약 problem 구조가 서로 다르다면, 여기서 처리하거나
    // 상위 컴포넌트에서 problem 객체를 통일된 구조로 변환해서 내려주면 됩니다.
    return (
        <div className="challenges-row">
            <div className="challenge-title">
                <Link to={`/${prefix}/${problem.id}`} className="title">
                    <span className="title-text">{problem.title}</span>
                </Link>
            </div>
            <div className="challenge-solvers">{problem.solverCount}</div>
            <div className="challenge-author">
                <div className="userinfo-container">
                    <div className="userinfo-sm">
                        <span className="user-icon"></span>
                        <div className="texts sm">
                            <Link to={`/user/${problem.authorId}`} className="field-nickname">
                                <span className="nickname">{problem.authorName}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
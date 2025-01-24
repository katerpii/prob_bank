import { Link } from 'react-router-dom'

export default function ChallengeRow({ problem }) {
    return (
        <div className="challenges-row">
            <div className="challenge-title">
                <Link to={`/algorithm/${problem.id}`} className="title">
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
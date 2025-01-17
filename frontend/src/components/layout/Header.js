import { Link } from 'react-router-dom'
import NavigateButton from '../common/NavigateButton'
import UserInfo from '../profile/UserProfile'
import './Header.css'

export default function Header(IsLoggedIn) {
    return (
        <>
            <nav className="navbar">
                <div className="nav-inner">
                    <ul className="nav-left">
                        <Link to="/"> Home </Link>
                    </ul>
                    <ul className="nav-middle">
                        <li className="nav-item"><Link to="/wargame"> 워게임 </Link></li>
                        <li className="nav-item"><Link to="/algorithm"> 알고리즘 </Link></li>
                        <li className="nav-item"><Link to="/write-up"> Write-up </Link></li>
                        <li className="nav-item"><Link to="/community"> 커뮤니티 </Link></li>
                        <li className="nav-item"><Link to="/ranking"> 랭킹 </Link></li>
                    </ul>
                    <ul className="nav-right">
                        <li className="nav-item">
                            <Link to="#"> 검색 </Link>
                        </li>
                        <div className="nav-item">
                            <li>
                                <Link to="#">
                                    <div className="notification-icon">
                                    </div>
                                </Link>
                            </li>
                        </div>
                        { IsLoggedIn ? <NavigateButton page="/login" ButtonName="로그인" /> : <UserInfo /> }
                    </ul>
                </div>
            </nav>
        </>
    )
}
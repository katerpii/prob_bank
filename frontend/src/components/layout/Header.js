import React from 'react'
import { Link } from 'react-router-dom'
import NavigateButton from '../common/NavigateButton'
import UserInfo from '../profile/UserInfo'
import './Header.css'

export default function Header(IsLoggedIn) {
    return (
        <>
            <nav className="navbar">
                <div className="navInner">
                    <ul className="navLeft">
                        <Link to="/"> Home </Link>
                    </ul>
                    <ul className="navMiddle">
                        <li className="navItem"><Link to="/wargame"> WarGame </Link></li>
                        <li className="navItem"><Link to="/algorithm"> Algorithm </Link></li>
                        <li className="navItem"><Link to="/write-up"> WriteUp </Link></li>
                        <li className="navItem"><Link to="/community"> Community </Link></li>
                        <li className="navItem"><Link to="/ranking"> Ranking </Link></li>
                    </ul>
                    <ul className="navRight">
                        <li className="navItem">
                            <Link to="#"> Search </Link>
                        </li>
                        <div className="navItem">
                            <li>
                                <Link to="#">
                                    <div className="notificationIcon">
                                    </div>
                                </Link>
                            </li>
                        </div>
                        { IsLoggedIn ? <NavigateButton page="/login" name="Login" /> : <UserInfo /> }
                    </ul>
                </div>
            </nav>
        </>
    )
}
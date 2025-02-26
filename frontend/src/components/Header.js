import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider'
import { Account } from '@toolpad/core/Account'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserOrg } from './UserOrg'
import useAuthStore from '../store/useAuthStore'

export default function Header() {
    const navigate = useNavigate()
    const { isLoggedIn, setLoggedIn } = useAuthStore()
    const [customSession, setCustomSession] = useState(null)

    // 사용자 세션 관리
    useEffect(() => {
        if (isLoggedIn) {
            // 실제 백엔드 API 호출 (현재는 주석 처리)
            /*
            axios.get('http://localhost:3030/profile', { withCredentials: true })
                .then(response => {
                    setCustomSession({
                        user: {
                            name: response.data.name,
                            email: response.data.email,
                            image: response.data.profileImage || null
                        }
                    })
                })
                .catch(error => {
                    console.error('프로필 로딩 실패:', error)
                    setLoggedIn(false)
                    setCustomSession(null)
                })
            */

            // 데모 사용자 데이터
            setCustomSession({
                user: {
                    name: "데모 사용자",
                    email: "demo@example.com",
                    image: "https://via.placeholder.com/150"
                }
            })
        } else {
            setCustomSession(null)
        }
    }, [isLoggedIn, setLoggedIn])

    // 인증 관련 함수들
    const authentication = {
        signIn: () => {
            navigate('/login')
        },
        signOut: () => {
            // 실제 로그아웃 API 호출 (현재는 주석 처리)
            /*
            axios.post('http://localhost:3030/auth/logout', {}, { withCredentials: true })
                .then(() => {
                    setLoggedIn(false)
                    setCustomSession(null)
                    navigate('/')
                })
                .catch(error => {
                    console.error('로그아웃 실패:', error)
                })
            */

            // 데모용 로그아웃 처리
            setLoggedIn(false)
            setCustomSession(null)
            navigate('/')
        }
    }

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar sx={{ display: "flex", alignItems: "center", px: 3 }}>
                {/* 좌측: 로고 및 홈 링크 */}
                <Box sx={{ flex: "0 1 auto", display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
                    >
                        JJW Side_Project
                    </Typography>
                </Box>

                {/* 중앙: 네비게이션 메뉴 */}
                <Box sx={{ flex: "1 1 auto", display: "flex", gap: 2, ml: 3 }}>
                    <Button component={Link} to="/algorithm" sx={{ textTransform: "none", color: "inherit" }}>
                        알고리즘
                    </Button>
                    <Button component={Link} to="/wargmae" sx={{ textTransform: "none", color: "inherit" }}>
                        워게임
                    </Button>
                    <Button component={Link} to="/writeup" sx={{ textTransform: "none", color: "inherit" }}>
                        Write-Up
                    </Button>
                    <Button component={Link} to="/community" sx={{ textTransform: "none", color: "inherit" }}>
                        커뮤니티
                    </Button>
                    <Button component={Link} to="/ranking" sx={{ textTransform: "none", color: "inherit" }}>
                        랭킹
                    </Button>
                </Box>

                {/* 우측: 로그인/프로필 영역 */}
                <Box sx={{ flex: "0 1 auto" }}>
                    <AuthenticationContext.Provider value={authentication}>
                        <SessionContext.Provider value={customSession}>
                            <Account slots={{ popoverContent: UserOrg }} />
                        </SessionContext.Provider>
                    </AuthenticationContext.Provider>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider'
import { Account } from '@toolpad/core/Account'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserOrg } from '../store/UserOrg'

export default function Header() {
    const navigate = useNavigate()

    const demoSession: CustomSession = {
        user: {
          name: 'Bharat Kashyap',
          email: 'bharat@mui.com',
          image: 'https://avatars.githubusercontent.com/u/19550456',
        },
        org: {
          name: 'MUI Inc.',
          url: 'https://mui.com',
          logo: 'https://mui.com/static/logo.svg',
        },
      };

    // customSession 상태: 초기에는 null로 설정되고, API로부터 데이터를 받아오면 세션 객체로 업데이트됨
    const [customSession, setCustomSession] = useState(demoSession)

    // 컴포넌트 마운트 시 실제 세션 데이터를 API에서 가져옵니다.
    useEffect(() => {
        async function fetchSession() {
            try {
                const { data } = await axios.get('/api/session')
                setCustomSession(data)
            } catch (error) {
                console.error('세션 데이터 패칭 오류:', error)
            }
        }
        fetchSession()
    }, [])

    // 로그아웃 함수: 세션을 null로 설정하고 홈으로 이동
    const handleLogout = useCallback(() => {
        setCustomSession(null)
        navigate("/")
    }, [navigate])

    // 인증 컨텍스트: 로그인/로그아웃 함수들을 제공
    const authentication = useMemo(() => ({
        signIn: () => navigate("/login"),
        signOut: handleLogout
    }), [handleLogout, navigate])

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

                {/* 우측: 로그인 상태에 따른 Account 컴포넌트 (사용자 프로필 표시) */}
                <Box sx={{ flex: "0 1 auto" }}>
                    <AuthenticationContext.Provider value={authentication}>
                        <SessionContext.Provider value={customSession}>
                            <Account signInUrl="/login" slots={{ popoverContent: UserOrg }} />
                        </SessionContext.Provider>
                    </AuthenticationContext.Provider>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
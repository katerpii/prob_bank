// src/components/Header.js
import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider'
import { Account } from '@toolpad/core/Account'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import useUserStore from '../store/useUserStore'

export default function Header() {
    const { isLoggedIn, logout } = useAuthStore()
    const { user, clearUser } = useUserStore()
    const navigate = useNavigate()

    // 로그아웃 함수
    const handleLogout = () => {
        logout()
        clearUser()
        navigate('/')
    }

    // 로그인 상태에 따른 세션 설정
    const session = isLoggedIn && user ? { user } : null

    // 로그인 & 로그아웃 컨텍스트
    const authentication = React.useMemo(() => ({
        signIn: () => navigate("/login"),
        signOut: handleLogout,
    }), [navigate])

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar sx={{ display: "flex", alignItems: "center", px: 3 }}>
                {/* Left: Logo + Home */}
                <Box sx={{ flex: "0 1 auto", display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}>
                        JJW Side_Project
                    </Typography>
                </Box>

                {/* Middle: Navigation (Left와 붙어있음) */}
                <Box sx={{ flex: "1 1 auto", display: "flex", gap: 3, ml: 3 }}>
                    <Typography component={Link} to="/algorithm" sx={{ textDecoration: "none", color: "inherit" }}>
                        알고리즘
                    </Typography>
                    <Typography component={Link} to="/wargmae" sx={{ textDecoration: "none", color: "inherit" }}>
                        워게임
                    </Typography>
                    <Typography component={Link} to="/writeup" sx={{ textDecoration: "none", color: "inherit" }}>
                        Write-Up
                    </Typography>
                    <Typography component={Link} to="/community" sx={{ textDecoration: "none", color: "inherit" }}>
                        커뮤니티
                    </Typography>
                    <Typography component={Link} to="/ranking" sx={{ textDecoration: "none", color: "inherit" }}>
                        랭킹
                    </Typography>
                </Box>

                {/* Right: 로그인 상태에 따라 변경 */}
                <Box sx={{ flex: "0 1 auto" }}>
                    <AuthenticationContext.Provider value={authentication}>
                        <SessionContext.Provider value={session}>
                            <Account signInUrl="/login" />
                        </SessionContext.Provider>
                    </AuthenticationContext.Provider>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
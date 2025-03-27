'use client';

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Avatar, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 세션 타입 정의
interface UserSession {
  user: {
    name: string;
    email: string;
    image: string | null;
  }
}

// 임시 인증 상태 관리
const useAuthStore = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const setLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };
  
  return { isLoggedIn, setLoggedIn };
};

export default function Header() {
    const router = useRouter();
    const { isLoggedIn, setLoggedIn } = useAuthStore();
    const [customSession, setCustomSession] = useState<UserSession | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // 사용자 세션 관리
    useEffect(() => {
        if (isLoggedIn) {
            // 데모 사용자 데이터
            setCustomSession({
                user: {
                    name: "데모 사용자",
                    email: "demo@example.com",
                    image: "https://via.placeholder.com/150"
                }
            });
        } else {
            setCustomSession(null);
        }
    }, [isLoggedIn, setLoggedIn]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignIn = () => {
        router.push('/login');
    };

    const handleSignOut = () => {
        // 데모용 로그아웃 처리
        setLoggedIn(false);
        setCustomSession(null);
        router.push('/');
        handleClose();
    };

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar sx={{ display: "flex", alignItems: "center", px: 3 }}>
                {/* 좌측: 로고 및 홈 링크 */}
                <Box sx={{ flex: "0 1 auto", display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
                    >
                        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                            JJW Side_Project
                        </Link>
                    </Typography>
                </Box>

                {/* 중앙: 네비게이션 메뉴 */}
                <Box sx={{ flex: "1 1 auto", display: "flex", gap: 2, ml: 3 }}>
                    <Button component={Link} href="/algorithm" sx={{ textTransform: "none", color: "inherit" }}>
                        알고리즘
                    </Button>
                    <Button component={Link} href="/wargame" sx={{ textTransform: "none", color: "inherit" }}>
                        워게임
                    </Button>
                    <Button component={Link} href="/writeup" sx={{ textTransform: "none", color: "inherit" }}>
                        Write-Up
                    </Button>
                    <Button component={Link} href="/community" sx={{ textTransform: "none", color: "inherit" }}>
                        커뮤니티
                    </Button>
                    <Button component={Link} href="/ranking" sx={{ textTransform: "none", color: "inherit" }}>
                        랭킹
                    </Button>
                </Box>

                {/* 우측: 로그인/프로필 영역 */}
                <Box sx={{ flex: "0 1 auto" }}>
                    {isLoggedIn && customSession ? (
                        <>
                            <Button
                                onClick={handleClick}
                                sx={{ 
                                    textTransform: "none", 
                                    color: "inherit",
                                    display: "flex",
                                    gap: 1
                                }}
                            >
                                <Avatar 
                                    src={customSession.user.image || undefined}
                                    alt={customSession.user.name}
                                    sx={{ width: 32, height: 32 }}
                                />
                                <Typography variant="body1">
                                    {customSession.user.name}
                                </Typography>
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>프로필</MenuItem>
                                <MenuItem onClick={handleClose}>설정</MenuItem>
                                <MenuItem onClick={handleSignOut}>로그아웃</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button
                            onClick={handleSignIn}
                            sx={{ textTransform: "none", color: "inherit" }}
                        >
                            로그인
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
} 
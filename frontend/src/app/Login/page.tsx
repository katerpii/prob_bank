'use client';

import React, { useState, FormEvent } from 'react';
import { Container, Box, TextField, Button, Typography, Alert, Divider } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface SnackbarData {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export default function LoginPage() {
    // 라우터 네비게이션 훅 초기화
    const router = useRouter();

    // MUI Snackbar를 통한 메시지 관리를 위한 state
    const [snackbarData, setSnackbarData] = useState<SnackbarData>({
        open: false,       // Snackbar 열림 여부
        message: '',       // 표시할 메시지
        severity: 'info'   // Alert의 상태 (success, error, warning, info)
    });

    // 로그인 폼 제출 핸들러
    const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        // FormData로 username, email, password 값 추출
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await axios.post(
                'http://localhost:3030/login',
                { username, email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                // 성공 메시지
                setSnackbarData({
                    open: true,
                    message: '로그인 성공!',
                    severity: 'success'
                });

                // 2초 뒤 메인 페이지로 이동 (필요에 맞춰 시간 조절)
                setTimeout(() => router.push('/'), 2000);

            } else {
                // 실패 메시지
                setSnackbarData({
                    open: true,
                    message: '로그인에 실패하였습니다.',
                    severity: 'error'
                });
            }
        } catch (error) {
            console.error('Login Error:', error);
            // 실패 메시지
            setSnackbarData({
                open: true,
                message: '로그인에 실패하였습니다.',
                severity: 'error'
            });
        }
    };

    return (
        // 전체 페이지 컨테이너
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
            {/* 로그인 폼 박스 */}
            <Box component="form" onSubmit={handleSignIn} noValidate sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
                {/* 페이지 제목 */}
                <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                    로그인
                </Typography>

                {/* 알림 메시지 영역 */}
                {snackbarData.open && (
                    <Alert
                        severity={snackbarData.severity}
                        sx={{ width: '100%', mb: 2 }}
                    >
                        {snackbarData.message}
                    </Alert>
                )}

                {/* username 입력필드 */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />

                {/* email 입력필드 */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                />

                {/* password 입력필드 */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />

                {/* 로그인 버튼 */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    로그인
                </Button>

                {/* ----- or ----- */}
                <Divider sx={{ my: 2 }}>or</Divider>

                {/* 회원가입 이동 링크 */}
                <Button
                    component={Link}
                    href="/join"
                    variant="outlined"
                    color="info"
                    fullWidth
                    size="medium"
                >
                    회원가입
                </Button>
            </Box>
        </Container>
    );
} 
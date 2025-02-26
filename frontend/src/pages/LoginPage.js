import React, { useState } from 'react'
import { Container, Box, TextField, Button, Typography, Snackbar, Alert, Divider } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuthStore from '../store/useAuthStore'
import useUserStore from '../store/useUserStore'

export default function LoginPage() {
    const navigate = useNavigate()

    // Zustand(React 상태 관리 라이브러리)에서 전역 상태 업데이트 함수를 가져옴
    const { setLoggedIn } = useAuthStore.getState()
    const { setUser } = useUserStore.getState()

    // MUI Snackbar를 통한 메시지 관리를 위한 state
    const [snackbarData, setSnackbarData] = useState({
        open: false,       // Snackbar 열림 여부
        message: '',       // 표시할 메시지
        severity: 'info'   // Alert의 상태 (success, error, warning, info)
    })

    // Snackbar 닫기 핸들러
    const handleCloseSnackbar = () => {
        setSnackbarData((prev) => ({ ...prev, open: false }))
    }

    // 로그인 폼 제출 함수
    const handleSignIn = async (event) => {
        event.preventDefault() // 폼 제출 시 페이지 리로드 방지

        // FormData로 username, email, password 값 추출
        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            const response = await axios.post(
                'http://localhost:3030/login',
                { username, email, password },
                { withCredentials: true }
            )

            if (response.status === 200) {
                const user = response.data
                setUser(user)         // 유저 정보 전역 상태 업데이트
                setLoggedIn(true)     // 로그인 상태 true 설정

                // 성공 메시지
                setSnackbarData({
                    open: true,
                    message: '로그인 성공!',
                    severity: 'success'
                })

                // 2초 뒤 메인 페이지로 이동 (필요에 맞춰 시간 조절)
                setTimeout(() => navigate('/'), 2000)

            } else {
                // 실패 메시지
                setSnackbarData({
                    open: true,
                    message: '로그인에 실패하였습니다.',
                    severity: 'error'
                })
            }
        } catch (error) {
            console.error('Login Error:', error)
            // 실패 메시지
            setSnackbarData({
                open: true,
                message: '로그인에 실패하였습니다.',
                severity: 'error'
            })
        }
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100vh'    // 화면 전체 높이 사용
            }}
        >
            {/* 로그인 박스 (MUI Box) */}
            <Box
                component="form"
                onSubmit={handleSignIn}
                noValidate
                sx={{
                    p: 3,
                    border: '1px solid #ccc',
                    borderRadius: 2
                }}
            >
                {/* 제목(Title) 대신 MUI Typography 사용 */}
                <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                    로그인
                </Typography>

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
                    to="/join"
                    variant="outlined"
                    color="info"
                    fullWidth
                    size="medium"
                >
                    회원가입
                </Button>
            </Box>

            {/* MUI Snackbar & Alert: 로그인 성공/실패 메시지 표시 */}
            <Snackbar
                open={snackbarData.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarData.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbarData.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}
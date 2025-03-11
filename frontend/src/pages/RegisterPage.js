import React, { useState } from 'react'
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function SignUpPage() {
    const navigate = useNavigate()

    // MUI Snackbar를 통한 메시지 관리를 위한 상태
    const [snackbarData, setSnackbarData] = useState({
        open: false,       // Snackbar 열림 여부
        message: '',       // 표시할 메시지
        severity: 'info'   // Alert의 상태 (success, error, warning, info)
    })

    // 회원가입 폼 제출 함수
    const handleSignUp = async (event) => {
        event.preventDefault() // 폼 제출 시 페이지 리로드 방지

        // FormData로 username, email, password 값 추출
        const formData = new FormData(event.currentTarget)
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            const response = await axios.post(
                'http://localhost:3030/join',
                { name, email, password },
                { withCredentials: true }
            )

            if (response.status === 200) {
                setSnackbarData({
                    open: true,
                    message: '회원가입 성공!',
                    severity: 'success'
                })

                // 2초 후 로그인 페이지로 이동
                setTimeout(() => navigate('/login'), 2000)
            } else {
                // 서버에서 200이 아닌 응답을 받은 경우
                setSnackbarData({
                    open: true,
                    message: '회원가입에 실패하였습니다.',
                    severity: 'error'
                })
            }
        } catch (error) {
            // 에러 발생 시
            console.error('Error:', error)
            setSnackbarData({
                open: true,
                message: '회원가입에 실패하였습니다.',
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
                height: '100vh'  // 화면 전체 높이 사용
            }}
        >
            <Box
                component="form"
                onSubmit={handleSignUp}
                noValidate
                sx={{
                    p: 3,
                    border: '1px solid #ccc',
                    borderRadius: 2
                }}
            >

                <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                    회원가입
                </Typography>

                {/* 알림 메시지를 여기로 이동 */}
                {snackbarData.open && (
                    <Alert
                        severity={snackbarData.severity}
                        sx={{ width: '100%', mb: 2 }}
                    >
                        {snackbarData.message}
                    </Alert>
                )}

                {/* username 입력 필드 */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Username"
                    name="name"
                    autoComplete="name"
                    autoFocus
                />

                {/* email 입력 필드 */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                />

                {/* password 입력 필드 */}
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

                {/* 가입하기 버튼 */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    가입하기
                </Button>
            </Box>
        </Container>
    )
}
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AppProvider, SignInPage } from '@toolpad/core'
import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useAuthStore from '../store/useAuthStore'
import useUserStore from '../store/useUserStore'

function Title() {
    return <h2 style={{ marginBottom: 8 }}> 로그인 </h2>
}

function CustomButton() {
    return (
        <Button type="submit" variant="outlined" color="info" size="small" disableElevation fullWidth sx={{ my: 2}}>
            로그인
        </Button>
    )
}

function SignUpLink() {
    return (
        <Link to="/join" variant="body2" >
            회원가입
        </Link>
    )
}

export default function CredentialsSignInPage() {
    const theme = useTheme()

    // preview-start
    const providers = [{ id: 'credentials', name: 'Email and Password' }]
    // preview-end

    const signIn = async (provider, formData) => {
        const email = formData.get('email')
        const password = formData.get('password')

        // Zustand Store 갱신 함수
        const { setLoggedIn } = useAuthStore.getState()
        const { setUser } = useUserStore.getState()
        try {
            const response = await axios.post(
                'http://localhost:3030/login', // 백엔드 login EndPoint
                { email, password },
                { withCredentials: true }
            )

            if  (response.status === 200) {
                const user = response.data

                // 전역 상태 갱신: 사용자 정보와 로그인 상태 업데이트
                setUser(user)
                setLoggedIn(true)

                alert('로그인 성공!')
            } else {
                alert('로그인에 실패하였습니다.')
            }
        } catch(error) {
            alert('로그인에 실패하였습니다.')
            console.error('Login Error: ', error)
        }
    }

    return (
        // preview-start
        <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
                slotProps={{ emailField: { autoFocus: false } }}
                slots={{ signUpLink: SignUpLink, submitButton: CustomButton, title: Title }}
            />
        </AppProvider>
        // preview-end
    )
}
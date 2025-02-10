import React from 'react'
import axios from 'axios'
import { AppProvider  } from '@toolpad/core/AppProvider'
import { SignInPage } from '@toolpad/core/SignInPage'
import { useTheme } from '@mui/material/styles'
import useAuthStore from '../store/useAuthStore'
import useUserStore from '../store/useUserStore'

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
            'http://localhost:3030/login/Proc', // 백엔드 login EndPoint
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

export default function CredentialsSignInPage() {
    const theme = useTheme()
    return (
        // preview-start
        <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
                slotProps={{ emailField: { autoFocus: false } }}
            />
        </AppProvider>
        // preview-end
    )
}
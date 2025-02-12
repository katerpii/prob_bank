import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AppProvider, SignInPage } from '@toolpad/core'
import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function Title() {
    return <h2 style={{ marginBottom: 8 }}> 회원가입 </h2>
}

function CustomButton() {
    return (
        <Button type="submit" variant="outlined" color="info" size="small" disableElevation fullWidth sx={{ my: 2}}>
            회원가입
        </Button>
    )
}

export default function CredentialsSignUpPage() {
    const theme = useTheme()
    const navigate = useNavigate()

    // preview-start
    const providers = [{ id: 'credentials', name: 'Email and Password' }]
    // preview-end

    const join = async (provider, formData) => {
        const email = formData.get('email')
        const password = formData.get('password')
        const name = "test"
    
        try {
            const response = await axios.post(
                'http://localhost:3030/join', // 백엔드 register EndPoint
                { email, password, name },
                { withCredentials: true }
            )
    
            if  (response.status === 200) {
                alert('회원가입 성공!')
                navigate("/login")
            } else {
                alert('회원가입에 실패하였습니다.')
            }
        } catch(error) {
            alert('회원가입에 실패하였습니다.')
            console.error('Error: ', error)
        }
    }

    return (
        // preview-start
        <AppProvider theme={theme}>
            <SignInPage
                signIn={join}
                providers={providers}
                slotProps={{ emailField: { autoFocus: false } }}
                slots={{ submitButton: CustomButton, title: Title, subtitle: 'none', rememberMe: 'none' }}
            />
        </AppProvider>
        // preview-end
    )
}
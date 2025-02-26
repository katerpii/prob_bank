import React from 'react'
import { Box, Stack, Typography, Avatar, Divider, Button } from '@mui/material'
import { AccountPreview, AccountPopoverFooter, SignOutButton } from '@toolpad/core/Account'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import useUserStore from '../store/useUserStore'

export function UserOrg() {
    const navigate = useNavigate()
    const { logout } = useAuthStore()
    const { clearUser } = useUserStore()

    // 실제 세션 데이터를 사용할 경우 (현재는 주석 처리)
    /*
    const session = useSession()
    const currentSession = session
    */

    // 데모 세션 데이터
    const demoSession = {
        user: {
            name: "데모 사용자",
            email: "demo@example.com",
            image: "https://via.placeholder.com/150"
        }
    }
    const currentSession = demoSession

    // 로그인되지 않은 경우 처리
    if (!currentSession?.user) {
        return (
            <Stack spacing={2} sx={{ p: 2 }}>
                <Typography>로그인이 필요합니다</Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/login')}
                    fullWidth
                >
                    로그인
                </Button>
            </Stack>
        )
    }

    // 로그아웃 처리
    const handleSignOut = () => {
        logout()
        clearUser()
        navigate('/')
    }

    // 프로필 표시
    return (
        <Stack>
            <AccountPreview variant="expanded" />
            <Stack mb={1}>
                <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <Avatar
                        src={currentSession.user.image}
                        alt={currentSession.user.name}
                        sx={{ width: 27, height: 24 }}
                    />
                    <Stack>
                        <Typography variant="caption" fontWeight="bolder">
                            {currentSession.user.name}
                        </Typography>
                        <Typography variant="caption">
                            {currentSession.user.email}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
            <Divider />
            <AccountPopoverFooter>
                <SignOutButton onClick={handleSignOut} />
            </AccountPopoverFooter>
        </Stack>
    )
}

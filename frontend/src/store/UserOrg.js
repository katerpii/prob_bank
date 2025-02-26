// src/store/UserOrg.js
import React from 'react'
import { Box, Typography, Avatar, Link } from '@mui/material'
import { useSession } from '@toolpad/core/useSession'

/*
CustomSession 예시 구조:
    {
    user: { name, email, image },
    org: { name, url, logo }
    }
*/

const demoSession: CustomSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharat@mui.com',
    image: 'https://avatars.githubusercontent.com/u/19550456'
  },
  org: {
    name: 'MUI Inc.',
    url: 'https://mui.com',
    logo: 'https://mui.com/static/logo.svg'
  }
}

function UserOrg() {
    const session = useSession()

    // 세션이나 조직 정보가 없으면 아무것도 렌더링하지 않습니다.
    if (!session || !session.org) return null

    const { org } = session

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            {/* 조직 로고 */}
            <Avatar src={org.logo} alt={org.name} sx={{ mr: 2 }} />
            <Box>
                {/* 조직명 */}
                <Typography variant="subtitle1">{org.name}</Typography>
                {/* 조직 URL을 링크로 표시 */}
                <Link href={org.url} target="_blank" rel="noopener" underline="hover">
                    {org.url}
                </Link>
            </Box>
        </Box>
    )
}

export { UserOrg }

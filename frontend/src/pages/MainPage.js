// src/components/MainPage.js
import React from 'react'
import { Container, Typography, Button, Box, Grid } from '@mui/material'

export default function MainPage() {
    return (
        <Box 
            sx={{ 
                flexGrow: 1, 
                minHeight: 'calc(100vh - 64px - 56px)', // 전체 높이에서 Header/Footer 제외
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Grid container spacing={2}>
                    {/* 왼쪽 영역 (4) */}
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            사이드 컨텐츠
                        </Typography>
                        <Typography variant="body2">
                            여기에 왼쪽 영역의 내용을 추가할 수 있습니다.
                        </Typography>
                    </Grid>

                    {/* 오른쪽 메인 컨텐츠 영역 (12) */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h3" gutterBottom>
                            환영합니다!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            MUI를 사용하여 반응형 UI를 쉽게 만들 수 있습니다. 이 템플릿을 활용하여 웹 사이트를 구축해보세요.
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Button variant="contained" color="primary" sx={{ mx: 1 }}>
                                더 알아보기
                            </Button>
                            <Button variant="contained" color="secondary" sx={{ mx: 1 }}>
                                연락하기
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
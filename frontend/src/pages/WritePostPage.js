import { useState } from 'react'
import { Button, Container, Card, Alert, TextField, Typography, Box, Stack, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function WritePostPage() {
    const navigate = useNavigate()

    const [alertMessage, setAlertMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [post, setPost] = useState({
        title: '',
        content: '',
        author: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setPost({ ...post, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3030/community/addpost', post,{ withCredentials: true })
            setAlertMessage('게시글이 작성되었습니다!')
            navigate(-1)
        } catch (error) {
            setErrorMessage('게시글 작성에 실패했습니다.')
            console.error(error)
        }
    }

    return (
        <Container sx={{ mt: 12, py: 5 }}> {/* mt: 12 (theme spacing 단위, 보통 8px 기준 -> 96px)로 조정 */}
            {/* Alert 위치: AppBar 아래 빈 공간 (예: 80px) */}
            {alertMessage && (
                <Alert
                    severity="success"
                    sx={{
                        position: 'fixed',
                        top: 80, // AppBar와 빈 공간을 고려한 위치
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1300,
                    }}
                >
                    {alertMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert
                    severity="error"
                    sx={{
                        position: 'fixed',
                        top: 80, // 동일하게 AppBar 아래에 배치
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1300,
                    }}
                >
                    {errorMessage}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* 왼쪽: 글 작성 폼 */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            글쓰기
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* 제목 입력 */}
                            <TextField
                                label="제목"
                                variant="outlined"
                                fullWidth
                                name="title"
                                value={post.title}
                                onChange={handleChange}
                                required
                            />

                            {/* 내용 입력 */}
                            <TextField
                                label="내용"
                                variant="outlined"
                                fullWidth
                                name="content"
                                multiline
                                rows={10}
                                value={post.content}
                                onChange={handleChange}
                                required
                            />

                            {/* 버튼 영역 */}
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                                    취소
                                </Button>
                                <Button variant="contained" color="primary" type="submit">
                                    작성
                                </Button>
                            </Stack>
                        </Box>
                    </Card>
                </Grid>

                {/* 오른쪽: User Profile 자리 표시 */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            User Profile
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
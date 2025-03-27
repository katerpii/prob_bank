'use client';

// 글 작성 페이지
import { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Container, Card, Alert, TextField, Typography, Box, Stack, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Post {
  board_id: number;
  title: string;
  content: string;
  author: string;
}

export default function WritePostPage() {
    // 라우터 훅 초기화
    const router = useRouter();

    // 상태 관리
    const [alertMessage, setAlertMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [post, setPost] = useState<Post>({
        board_id: 0,
        title: '',
        content: '',
        author: '',
    });

    // 입력 필드 변경 핸들러
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    // 폼 제출 핸들러 (작성)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3030/community/addpost', post, { withCredentials: true });
            setAlertMessage('게시글이 작성되었습니다!');
            setTimeout(() => {
                router.back();
            }, 1500);
        } catch (error) {
            setErrorMessage('게시글 작성에 실패했습니다.');
            console.error(error);
        }
    };

    return (
        // 전체 페이지 컨테이너
        <Container sx={{ py: 4 }}> 
            {/* Alert 메시지 */}
            {alertMessage && (
                <Alert
                    severity="success"
                    sx={{
                        position: 'fixed',
                        top: '80px',
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
                        top: '80px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1300,
                    }}
                >
                    {errorMessage}
                </Alert>
            )}

            {/* 메인 콘텐츠 그리드 */}
            <Grid container spacing={3}>
                {/* @ts-expect-error MUI Grid 타입 정의 문제 */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4 }}>
                        {/* 페이지 제목 */}
                        <Typography variant="h4" gutterBottom>
                            글쓰기
                        </Typography>

                        {/* 입력 폼 */}
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* 제목 입력 */}
                            <TextField
                                label="제목"
                                variant="outlined"
                                fullWidth
                                name="title"
                                value={post.title || ''}
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
                                rows={8}
                                value={post.content || ''}
                                onChange={handleChange}
                                required
                            />

                            {/* 버튼 영역 */}
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => router.back()}
                                >
                                    취소
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    type="submit"
                                >
                                    작성
                                </Button>
                            </Stack>
                        </Box>
                    </Card>
                </Grid>

                {/* @ts-expect-error MUI Grid 타입 정의 문제 */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            User Profile
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
} 
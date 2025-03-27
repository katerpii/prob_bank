'use client';

// 글 수정 페이지
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Button, Container, Card, Alert, TextField, Typography, Box, Stack, Grid } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

interface Post {
  board_id: number;
  title: string;
  content: string;
  author: string;
}

export default function EditPostPage() {
    // 라우터 훅 초기화
    const router = useRouter();
    const params = useParams();
    const postId = params?.id ? String(params.id).split('-')[0] : '';

    // 상태 관리
    const [alertMessage, setAlertMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [post, setPost] = useState<Post>({
        board_id: 0,
        title: '',
        content: '',
        author: '',
    });

    // 게시글 데이터 로드
    useEffect(() => {
        if (postId) {
            axios.get(`http://localhost:3030/community/${postId}`, { withCredentials: true })
                .then(response => {
                    setPost(response.data);
                })
                .catch(error => {
                    console.error('게시글을 불러오는 데 실패했습니다:', error);
                    setErrorMessage('게시글을 불러오는 데 실패했습니다.');
                });
        }
    }, [postId]);

    // 입력 필드 변경 핸들러
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    // 폼 제출 핸들러 (수정)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!post.board_id) {
                throw new Error('게시글 ID가 없습니다.');
            }
            await axios.put(`http://localhost:3030/community/updatepost/${post.board_id}`, post, { withCredentials: true });
            setAlertMessage('게시글이 수정되었습니다!');
            setTimeout(() => {
                router.back();
            }, 1500);
        } catch (error) {
            setErrorMessage('게시글 수정에 실패했습니다.');
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
                {/* 왼쪽: 글 수정 폼 */}
                {/* @ts-expect-error MUI Grid 타입 정의 문제 */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4 }}>
                        {/* 페이지 제목 */}
                        <Typography variant="h4" gutterBottom>
                            글 수정하기
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
                                    수정
                                </Button>
                            </Stack>
                        </Box>
                    </Card>
                </Grid>

                {/* 오른쪽: User Profile 자리 표시 */}
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
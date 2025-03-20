import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Typography, Box, Stack, Container, Divider, Paper, Grid } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import useFormatDate from '../../../../src copy/hooks/useFromDate' // useFormatDate 경로 확인

export default function ViewPostPage() {
    // 상태 관리 및 라우터 훅 초기화
    const { IdAndTitle } = useParams()
    const postId = IdAndTitle?.split('-')[0] || ''
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [author, setAuthor] = useState('')

    // 게시글 데이터 상태 초기화
    const [post, setPost] = useState({
        board_id: 0,
        title: '',
        content: '',
        author: '',
        likeCount: 0,
        viewCount: 0,
        createdAt: 0
    })

    // 게시글 데이터 및 사용자 정보 불러오기
    useEffect(() => {
        axios
            .get(`http://localhost:3030/community/${postId}`, { withCredentials: true })
            .then(res => setPost(res.data))
            .catch(error => {
                console.log(error)
                setErrorMessage('게시글을 불러오는 데 실패했습니다.')
            })
        axios
            .get('http://localhost:3030/profile', { withCredentials: true })
            .then(res => setAuthor(res.data.email))
            .catch(error => console.log(error))
    }, [postId])

    // 게시글 삭제 핸들러
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3030/community/deletepost/${postId}`, { withCredentials: true })
            setAlertMessage('게시글이 삭제되었습니다.')
            navigate(-1)
        } catch (error) {
            console.log(error)
            setErrorMessage('게시글 삭제에 실패했습니다.')
        }
    }

    return (
        <Box sx={{ width: '100%', bgcolor: '#f5f5f5' }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={3}>
                    {/* 메인 컨텐츠 영역 */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                            {/* 게시글 헤더 */}
                            <Box sx={{ p: 3, bgcolor: 'white' }}>
                                <Typography variant="h4" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Stack 
                                    direction="row" 
                                    spacing={2} 
                                    divider={<Divider orientation="vertical" flexItem />}
                                    sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
                                >
                                    <Typography variant="body2">작성자: {post.author}</Typography>
                                    <Typography variant="body2">작성일: {useFormatDate(post.createdAt)}</Typography>
                                    <Typography variant="body2">조회수: {post.viewCount}</Typography>
                                    <Typography variant="body2">좋아요: {post.likeCount}</Typography>
                                </Stack>
                            </Box>

                            <Divider />

                            {/* 게시글 본문 */}
                            <Box sx={{ p: 3, bgcolor: 'white', minHeight: '300px' }}>
                                {errorMessage && (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        {errorMessage}
                                    </Alert>
                                )}
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        lineHeight: 1.8
                                    }}
                                >
                                    {post.content}
                                </Typography>
                            </Box>

                            <Divider />

                            {/* 작업 버튼 영역 */}
                            <Box sx={{ p: 2, bgcolor: 'white' }}>
                                <Stack direction="row" spacing={2} justifyContent="flex-end">
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={() => navigate(-1)}
                                    >
                                        뒤로가기
                                    </Button>
                                    {/* {author === post.author && ( */}
                                    <>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => {
                                                console.log("전달하려는 board_id: ", post.board_id)
                                                navigate(`/community/edit/post/${post.board_id}-${post.title.replace(/\s+/g, '-')}`, { state: {post: post} })
                                            }}
                                        >
                                            수정
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="error" 
                                            onClick={() => setShowModal(true)}
                                        >
                                            삭제
                                        </Button>
                                    </>
                                    {/* )} */}
                                </Stack>
                            </Box>
                        </Paper>

                        {/* 성공 메시지 알림 */}
                        {alertMessage && (
                            <Alert 
                                icon={<CheckIcon fontSize="inherit" />} 
                                severity="success" 
                                sx={{ mt: 2 }}
                            >
                                {alertMessage}
                            </Alert>
                        )}
                    </Grid>

                    {/* 사이드바 영역 */}
                    <Grid item xs={12} md={4}>
                        <Paper 
                            elevation={1} 
                            sx={{ 
                                p: 3, 
                                borderRadius: 2,
                                bgcolor: 'white' 
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                관련 게시글
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                추천 게시글 영역
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* 삭제 확인 다이얼로그 */}
            <Dialog 
                open={showModal} 
                onClose={() => setShowModal(false)}
                PaperProps={{
                    sx: { borderRadius: 2 }
                }}
            >
                <DialogTitle>게시글 삭제</DialogTitle>
                <DialogContent>
                    <Typography>정말 게시글을 삭제하시겠습니까?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)} color="secondary" variant="contained">
                        취소
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
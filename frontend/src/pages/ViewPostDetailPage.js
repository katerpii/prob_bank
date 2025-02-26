import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Typography, Box, Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import useFormatDate from '../hooks/useFromDate' // useFormatDate 경로 확인

export default function ViewPostPage() {
    const { IdAndTitle } = useParams()
    const postId = IdAndTitle?.split('-')[0] || ''
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false) // 모달 상태
    const [errorMessage, setErrorMessage] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [author, setAuthor] = useState('')

    const [post, setPost] = useState({
        board_id: 0,
        title: '',
        content: '',
        author: '',
        likeCount: 0,
        viewCount: 0,
        createdAt: 0
    })

    useEffect(() => {
        axios
            .get(`http://localhost:3030/community/${postId}`, { withCredentials: true })
            .then(res => setPost(res.data))
            .catch(error => {
                console.log(error)
                setErrorMessage('게시글을 불러오는 데 실패했습니다.')
            })
        axios
            .get('http://localhost:3030/auth/check', { withCredentials: true })
            .then(res => setAuthor(res.data.email))
            .catch(error => console.log(error))
    }, [postId])

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
        <Box sx={{ maxWidth: 800, margin: 'auto', py: 5 }}>
            <Card sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {post.title}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 2, color: 'text.secondary' }}>
                    <Typography>작성자: {post.author}</Typography>
                    <Typography>작성일: {useFormatDate(post.createdAt)}</Typography>
                    <Typography>조회수: {post.viewCount}</Typography>
                    <Typography>좋아요: {post.likeCount}</Typography>
                </Stack>

                {/* 오류 메시지 */}
                {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

                <Typography variant="body1" sx={{ mb: 3 }}>
                    {post.content}
                </Typography>

                {/* 버튼 영역 */}
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                        뒤로가기
                    </Button>
                    {/* {author === post.author && ( */}
                        <>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => navigate(`/community/edit/post`, { 
                                    state: { post: post }
                                })}
                            >
                                수정
                            </Button>
                            <Button variant="contained" color="error" onClick={() => setShowModal(true)}>
                                삭제
                            </Button>
                        </>
                    {/* )} */}
                </Stack>
            </Card>

            {/* 게시글 삭제 성공 메시지 */}
            {alertMessage && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ mt: 2 }}>
                    {alertMessage}
                </Alert>
            )}

            {/* 삭제 확인 다이얼로그 */}
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>게시글 삭제</DialogTitle>
                <DialogContent>
                    <Typography>정말 게시글을 삭제하시겠습니까?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)} color="secondary">
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
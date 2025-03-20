import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Container, Grid, Typography, Button, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import useUserStore from '../../../src copy/store/useUserStore'

export default function CommunityPage() {
    const user = useUserStore((state) => state.user)  // useUserStore에서 user 정보 가져오기

    // 백엔드로부터 받아오는 post 형식을 지정하는 state
    const [posts, setPosts] = useState([{
        board_id: 0,
        title: '',
        author: '',
        likeCount: 0,
        viewCount: 0,
        createdAt: 0
    }])
    // 백엔드로부터 커뮤니티 전체의 게시글을 받아옴
    // 가장 첫번째 data를 우선적으로 posts state에 설정
    useEffect(() => {
        axios.get('http://localhost:3030/community', { withCredentials: true })
            .then(response => { setPosts(response.data) })
            .catch(error => { console.error('게시글을 불러오는데 실패했습니다:', error) })
    }, [])

    return (
        // 전체 페이지
        <Box 
            sx={{ 
                flex: 1,
                width: '100%',
                backgroundColor: 'white'
            }}
        >
            {/* 실제 컨텐츠들이 들어가는 영역 */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={3}>
                    {/* 왼쪽 영역 (사이드 컨텐츠) */}
                    <Grid item xs={12} md={4} sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            UserProfile
                        </Typography>
                        <Typography variant="body2">
                            {user?.username || 'Guest'}  {/* user가 있으면 username 표시, 없으면 'Guest' 표시 */}
                        </Typography>
                    </Grid>

                    {/* 오른쪽 메인 컨텐츠 영역 */}
                    <Grid item xs={12} md={8} sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
                        {/* 상단 액션 바 */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mb: 3
                        }}>
                            <TextField
                                variant="outlined"
                                placeholder="게시글 검색"
                                size="small"
                                InputProps={{
                                    startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />
                                }}
                                sx={{ width: 300 }}
                            />
                            <Button 
                                component={Link}
                                to="/community/new/post"
                                variant="contained" 
                                color="primary"
                                sx={{ borderRadius: 1 }}
                            >
                                글 작성
                            </Button>
                        </Box>

                        {/* 게시글 테이블 */}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell> 제목 </TableCell>
                                        <TableCell> 작성자 </TableCell>
                                        <TableCell> 작성일 </TableCell>
                                        <TableCell> 조회수 </TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* 백엔드로부터 posts data를 받아 board_id를 키로 한개씩 반환 */}
                                <TableBody>
                                    {posts.map((post) => (
                                        <TableRow 
                                            key={post.board_id}
                                            sx={{ 
                                                '&:hover': { 
                                                    backgroundColor: '#fafafa',
                                                    cursor: 'pointer' 
                                                }
                                            }}
                                        >
                                            <TableCell>
                                                <Link to={`/community/post/${post.board_id}-${post.title.replace(/\s+/g, '-')}`}>
                                                    {post.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{post.author.userEmail}</TableCell>
                                            <TableCell>{post.createdAt}</TableCell>
                                            <TableCell>{post.viewCount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
    Box, 
    Container, 
    Grid, 
    Typography, 
    Button, 
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import { Search } from '@mui/icons-material'

export default function CommunityPage() {
    const [posts, setPosts] = useState([{
        board_id: 0,
        title: '',
        author: '',
        likeCount: 0,
        viewCount: 0,
        createdAt: 0
    }])

    useEffect(() => {
        axios.get('http://localhost:3030/community')
            .then(response => { setPosts(response.data) })
            .catch(error => { console.error('게시글을 불러오는데 실패했습니다:', error) })
    }, [])

    return (
        <Box 
            sx={{ 
                flexGrow: 1,
                minHeight: 'calc(100vh - 64px - 56px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5'
            }}
        >
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Grid container spacing={3}>
                    {/* 왼쪽 영역 (사이드 컨텐츠) */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            사이드 컨텐츠
                        </Typography>
                        <Typography variant="body2">
                            여기에 왼쪽 영역의 내용을 추가할 수 있습니다.
                        </Typography>
                    </Grid>

                    {/* 오른쪽 메인 컨텐츠 영역 */}
                    <Grid item xs={12} md={8}>
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
                                            <TableCell>{post.title}</TableCell>
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
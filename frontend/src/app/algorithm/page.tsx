'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Container, Grid, Paper, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent } from '@mui/material';
import axios from 'axios';

interface Challenge {
    id: number;
    title: string;
    solvedCount: number;
    author: string;
}

export default function AlgorithmPage() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [totalChallenges, setTotalChallenges] = useState(0);
    const [sortOrder, setSortOrder] = useState('latest');

    useEffect(() => {
        // API 호출 예시
        const ProblemList = async () => {
            try {
                const response = await axios.get('http://localhost:3030/algorithm');
                setChallenges(response.data.challenge);
                setTotalChallenges(response.data.challenge.length); // 총 개수를 totalchallenges에 설정
            } catch (error) {
                console.error('문제 목록을 불러오는데 실패했습니다:', error);
            }
        };

        ProblemList();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {/* @ts-expect-error MUI Grid 타입 정의 문제 */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        {/* 검색 및 필터 섹션 */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                placeholder="찾고 싶은 문제를 검색하세요"
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                            <Grid container spacing={2}>
                                {/* @ts-expect-error MUI Grid 타입 정의 문제 */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>난이도</InputLabel>
                                        <Select value="" label="난이도">
                                            <MenuItem value="easy">쉬움</MenuItem>
                                            <MenuItem value="medium">보통</MenuItem>
                                            <MenuItem value="hard">어려움</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* @ts-expect-error MUI Grid 타입 정의 문제 */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>풀이 여부</InputLabel>
                                        <Select value="" label="풀이 여부">
                                            <MenuItem value="solved">해결</MenuItem>
                                            <MenuItem value="unsolved">미해결</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* 총 문제 수와 정렬 옵션 */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">
                                총 <Box component="span" sx={{ color: 'primary.main' }}>{totalChallenges}</Box>개의 문제가 있습니다.
                            </Typography>
                            <FormControl sx={{ minWidth: 120 }}>
                                <Select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    size="small"
                                >
                                    <MenuItem value="latest">최신순</MenuItem>
                                    <MenuItem value="popular">인기순</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* 문제 목록 테이블 */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>문제 정보</TableCell>
                                        <TableCell align="center">풀이 수</TableCell>
                                        <TableCell align="center">출제자</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {challenges.map((challenge) => (
                                        <TableRow key={challenge.id}>
                                            <TableCell>{challenge.title}</TableCell>
                                            <TableCell align="center">{challenge.solvedCount}</TableCell>
                                            <TableCell align="center">{challenge.author}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                {/* @ts-expect-error MUI Grid 타입 정의 문제 */}
                <Grid item xs={12} md={4}>
                    {/* 문제 출제 카드 */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                기발한 아이디어가 있으신가요?
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                여러분들의 멋진 문제를 공개해주세요!
                            </Typography>
                            <Button
                                component={Link}
                                href="/algorithm/challenges/new"
                                variant="contained"
                                fullWidth
                            >
                                알고리즘 문제 출제하기
                            </Button>
                        </CardContent>
                    </Card>

                    {/* 랭킹 카드 */}
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                알고리즘 TOP 10
                            </Typography>
                            {/* 여기에 랭킹 리스트를 추가할 수 있습니다 */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
} 
// ViewPostPage.js
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Card } from 'react-bootstrap'
import '../styles/ViewPostPage.css' // CSS 파일 분리

// 날짜 포맷팅 함수
// TODO : 날짜 포멧팅 hooks로 만들기
const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}.${month}.${day} ${hours}:${minutes}`
}

export default function ViewPostPage() {
    // URL 파라미터에서 id와 title을 합쳐서 넘긴 경우, "idAndTitle"이 들어옴.
    // 예: "/post/123-게시글제목" -> idAndTitle = "123-게시글제목"
    const { idAndTitle } = useParams()

    // 실제로 게시글 번호(postId)만 필요하다면, split 해서 사용
    const postId = idAndTitle?.split('-')[0] || ''
    const navigate = useNavigate()

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
            .get(`http://localhost:3030/community/${postId}`) // 경로 수정, backend API 작성
            .then(res => setPost(res.data))
            .catch(error => console.log(error))
    }, [postId])

    return (
        <>
            <div className="view-post-container">
                <Card className="post-card">
                    <Card.Body>
                        <Card.Title className="post-title">{post.title}</Card.Title>
                        
                        <div className="post-meta">
                            <span>작성자: {post.author}</span>
                            <span>작성일: {formatDate(post.createdAt)}</span>
                            <span>조회수: {post.viewCount}</span>
                            <span>좋아요: {post.likeCount}</span>
                        </div>

                        {/* 실제 게시글 내용 */}
                        <Card.Text className="post-content">
                            {post.content}
                        </Card.Text>

                        {/* 필요하다면 "뒤로가기" 버튼, 수정/삭제 버튼 등 추가 가능 */}
                        <div className="post-actions">
                            <Button variant="secondary" onClick={() => navigate(-1)}>
                                뒤로가기
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
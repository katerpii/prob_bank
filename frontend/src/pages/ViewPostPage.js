import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Card, Modal } from 'react-bootstrap'
import useFormatDate from '../hooks/useFormatDate' // 날짜 포맷팅 Hook 추가
import '../styles/ViewPostPage.css' // CSS 파일 분리

export default function ViewPostPage() {
    // URL 파라미터에서 id와 title을 합쳐서 넘긴 경우, "idAndTitle"이 들어옴.
    // 예: "/post/123-게시글제목" -> idAndTitle = "123-게시글제목"
    const { idAndTitle } = useParams()

    // 실제로 게시글 번호(postId)만 필요하다면, split 해서 사용
    const postId = idAndTitle?.split('-')[0] || ''
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false) // 모달 상태

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
            .catch(error => {
                console.log(error)
                alert('게시글을 불러오는 데 실패했습니다.') // 오류 발생 시 사용자 알림 추가
            })
    }, [postId])

    const handleDelete = () => {
        axios
            .delete(`http://localhost:3030/delete/${postId}`) // 삭제 API 호출
            .then(() => {
                alert('게시글이 삭제되었습니다.')
                navigate(-1)
            })
            .catch(error => {
                console.log(error)
                alert('게시글 삭제에 실패했습니다.')
            })
    }

    return (
        <>
            <div className="view-post-container">
                <Card className="post-card">
                    <Card.Body>
                        <Card.Title className="post-title">{post.title}</Card.Title>
                        
                        <div className="post-meta">
                            <span>작성자: {post.author}</span>
                            <span>작성일: {useFormatDate(post.createdAt)}</span>
                            <span>조회수: {post.viewCount}</span>
                            <span>좋아요: {post.likeCount}</span>
                        </div>

                        {/* 실제 게시글 내용 */}
                        <Card.Text className="post-content">
                            {post.content}
                        </Card.Text>

                        {/* 필요하다면 "뒤로가기" 버튼, 수정/삭제 버튼 등 추가 가능 */}
                        <div className="post-actions">
                            <Button variant="danger" onClick={() => setShowModal(true)}>
                                삭제
                            </Button>
                            <Button variant="secondary" onClick={() => navigate(-1)}>
                                뒤로가기
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/* 삭제 확인 모달 */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body>정말 게시글을 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        취소
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
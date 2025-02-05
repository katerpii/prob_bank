// ViewPostPage.js
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
    if (!dateString) return ''
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
    console.log('idAndTitle:', idAndTitle) // 디버깅용

    // 실제로 게시글 번호(postId)만 필요하다면, split 해서 사용
    const postId = idAndTitle?.split('-')[0] || ''

    const [post, setPost] = useState({
        post_id: 0,
        title: '',
        content: '',
        author: '',
        likeCount: 0,
        viewCount: 0,
        createdAt: ''
    })

    useEffect(() => {
        axios
            .get(`http://localhost/post/${postId}`)
            .then(res => {
                setPost(res.data)
            })
            .catch(error => console.log(error))
    }, [postId])

    return (
        <>
            <div className="view-post-container" style={{ padding: '2rem' }}>
                <h2 className="post-title">{post.title}</h2>

                <div className="post-meta" style={{ marginBottom: '1rem', color: '#555' }}>
                    <span>작성자: {post.author}</span> &nbsp;|&nbsp;
                    <span>작성일: {formatDate(post.createdAt)}</span> &nbsp;|&nbsp;
                    <span>조회수: {post.viewCount}</span> &nbsp;|&nbsp;
                    <span>좋아요: {post.likeCount}</span>
                </div>

                {/* 실제 게시글 내용 */}
                <div className="post-content" style={{ whiteSpace: 'pre-line' }}>
                    {post.content}
                </div>

                {/* 필요하다면 "뒤로가기" 버튼, 수정/삭제 버튼 등 추가 가능 */}
                <div style={{ marginTop: '1rem' }}>
                    <button onClick={() => window.history.back()}>
                        뒤로가기
                    </button>
                </div>
            </div>
        </>
    )
}
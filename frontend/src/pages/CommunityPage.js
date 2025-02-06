import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import NavigateButton from '../components/common/NavigateButton'
import '../styles/CommunityPage.css'

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}.${month}.${day}`
}

export default function CommunityPage() {
    const [posts, setPosts] = useState([{
        board_id: 0, // int형
        title: '',   // string형
        author: '',  // string형
        likeCount: 0, // int형
        viewCount: 0, // int형
        createdAt: 0  // int형
    }])

    // backend단에서 list 객체 가져오기
    useEffect(() => {
        axios.get('http://localhost:3030/community/post/list') // get 요청 주소 (조정)
            .then(res => setPosts(res.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <div className="community-index">
                        <div className="community-banner">
                            자유게시판
                        </div>
                        <div className="community-posts">
                            <div className="header">
                                <div className="left-title-wrapper">
                                    <div className="title"> 모든 글 </div>
                                </div>
                                <div className="right-action">
                                    <NavigateButton page="/community/posts/new" ButtonName="글 작성하기" state={{ boardName: "커뮤니티", prevPath: "/community" }}/>
                                </div>
                            </div>
                            <div className="search">
                                <input />
                            </div>
                            <div className="post-list">
                                <table role="table" aria-busy="false" aria-colcount="5" className="table b-table post-table table-hover">
                                    <colgroup>
                                        <col className="col-title" />
                                        <col className="col-author" />
                                        <col className="col-hitcount" />
                                        <col className="col-view" />
                                        <col className="col-created" />
                                    </colgroup>
                                    <thead>
                                        <tr className="post-table-thead-tr">
                                            <th role="columnheader" scope="col" aria-colindex="1" className="post-table-th">
                                                <div> 글 제목 </div>
                                            </th>
                                            <th role="columnheader" scope="col" aria-colindex="2" className="post-table-th d-none d-lg-table-cell">
                                                <div> 작성자 </div>
                                            </th>
                                            <th role="columnheader" scope="col" aria-colindex="3" className="text-center post-table-th">
                                                <div> 추천 </div>
                                            </th>
                                            <th role="columnheader" scope="col" aria-colindex="4" className="text-center post-table-th">
                                                <div> 조회 </div>
                                            </th>
                                            <th role="columnheader" scope="col" aria-colindex="5" className="text-center post-table-th">
                                                <div> 작성일 </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map((post) => (
                                            <tr key={post.board_id} className="post-table-row">
                                                <td className="post-title">
                                                    <Link to={`/community/posts/${post.board_id}-${post.title}`}>{post.title}</Link>
                                                </td>
                                                <td className="post-author d-none d-lg-table-cell">{post.author}</td>
                                                <td className="text-center">{post.likeCount}</td>
                                                <td className="text-center">{post.viewCount}</td>
                                                <td className="text-center">{formatDate(post.createdAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* <ul>
                                <li>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}
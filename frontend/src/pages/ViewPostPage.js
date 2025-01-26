import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}.${month}.${day} ${hours}:${minutes}`
}

export default function ViewPostPage () {
    const { idAndTitle } = useParams()
    console.log('idAndTitle:', idAndTitle) // 디버깅용

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
        axios.get(`http://localhost/post/${postId}`)
            .then(res => setPost(res.data))
            .catch(error => console.log(error))
    }, [postId])

    return (
        <>
            <Header/>
            
            <Footer/>
        </>
    )
}
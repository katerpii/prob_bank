import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import CommunityPage from '../pages/CommunityPage'
import ViewPostDetailPage from '../pages/ViewPostDetailPage'
import WritePostPage from '../pages/WritePostPage'
import NotFound from '../pages/NotFound'

export default function Router() { // path에 따른 Page Routing
    return (
        <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />
            
            {/* 로그인 관련 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<RegisterPage />} />
            
            {/* 커뮤니티 */}
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/post/:IdAndTitle" element={<ViewPostDetailPage />} />
            <Route path="/community/new/post" element={<WritePostPage />} />

            {/* 404 페이지 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
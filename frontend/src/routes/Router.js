import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import LoginPage from '../pages/LoginPage'
import NotFound from '../pages/NotFound'

export default function Router() { // path에 따른 Page Routing
    return (
        <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />
            
            {/* 로그인 관련 */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* 404 페이지 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
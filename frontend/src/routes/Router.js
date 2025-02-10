import React from 'react'
import { Routes, Route } from 'react-router-dom'

export default function Router() { // path에 따른 Component 라우팅
    return (
        <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />
            
            {/* 404 페이지 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
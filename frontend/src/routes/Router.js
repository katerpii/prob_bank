import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { MyPage, LoginPage, RegisterPage, CommunityPage, WargameListPage, AlgorithmListPage, WargameDetailPage, AlgorithmDetailPage, RankingPage } from '../pages'
import MyPage from '../pages/MyPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import CommunityPage from '../pages/CommunityPage'
import WargameListPage from '../pages/WargameListPage'
import WargameDetailPage from '../pages/WargameDetailPage'
import AlgorithmListPage from '../pages/AlgorithmListPage'
import AlgorithmDetailPage from '../pages/AlgorithmDetailPage'
import RankingPage from '../pages/RankingPage' // 왜 이건 되는데
import App from '../App'
import NotFound from '../pages/404'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/login" element={<LoginPage />} />                
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/wargame" element={<WargameListPage />} />
                <Route path="/algorithm" element={<AlgorithmListPage />} />
                <Route path="/wargame/:id" element={<WargameDetailPage />} />
                <Route path="/algorithm/:id" element={<AlgorithmDetailPage />} />
                <Route path="/ranking" element={<RankingPage />} />
                <Route path={"*"} element={<NotFound />} />          
            </Routes>
        </BrowserRouter>
    )
}
import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import { MyPage, LoginPage, RegisterPage, CommunityPage, WargameListPage, AlgorithmListPage, WargameDetailPage, AlgorithmDetailPage, RankingPage } from '../pages'
// * TODO 위 형식으로 import 할 수 있는 방법 찾기 .. -> 더 번거로워질 듯 ;
import MainPage from '../pages/MainPage.js'
import MyPage from '../pages/MyPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import WritePostPage from '../pages/WritePostPage'
import CommunityPage from '../pages/CommunityPage'
import ViewPostPage from '../pages/ViewPostPage'
import AlgorithmListPage from '../pages/AlgorithmListPage'
import AlgorithmDetailPage from '../pages/AlgorithmDetailPage'
import WargameListPage from '../pages/WargameListPage'
import WargameDetailPage from '../pages/WargameDetailPage'
import CreateChallengePage from '../pages/CreateChallengePage.js'
import WriteUpPage from '../pages/WriteUpPage'
import RankingPage from '../pages/RankingPage' 
import NotFound from '../pages/404'  // 왜 이건 되는데

export default function Router() { // path에 따른 Component 라우팅
    return (
        <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />
            
            {/* 일반 페이지들 */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Community 관련 */}
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/posts/new" element={<WritePostPage />} />
            <Route path="/community/posts/:idAndTitle" element={<ViewPostPage />} />
            
            {/* Algorithm */}
            <Route path="/algorithm" element={<AlgorithmListPage />} />
            <Route path="/algorithm/challenges/new" element={<CreateChallengePage />} />
            <Route path="/algorithm/:idAndTitle" element={<AlgorithmDetailPage />} />
            
            {/* Wargame */}
            <Route path="/wargame" element={<WargameListPage />} />
            <Route path="/wargame/challenges/new" element={<CreateChallengePage />} />
            <Route path="/wargame/:idAndTitle" element={<WargameDetailPage />} />
            
            {/* Write-up */}
            <Route path="/write-up" element={<WriteUpPage />} />
            <Route path="/write-up/posts/new" element={<WritePostPage />} />
            <Route path="/write-up/posts/:idAndTitle" element={<ViewPostPage />} />
            
            {/* Ranking */}
            <Route path="/ranking" element={<RankingPage />} />
            
            {/* 404 페이지 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
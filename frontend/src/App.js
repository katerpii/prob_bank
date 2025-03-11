// App.js
import React from 'react'
import './styles/App.css'

// Layout 구성 요소
import Header from './components/Header'
import Footer from './components/Footer'

// 라우트 목록 관리하는 Router 컴포넌트
import Routes from './routes/Router'

function App() {
    return (
        <div className="App">
            <Header />
            <main className="main-content">
                <Routes />
            </main>
            <Footer />
        </div>
    )
}

export default App
import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuthStore from '../store/authStore'
import useUserStore from '../store/userStore'
import { Container, Button } from 'react-bootstrap'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function LoginPage() {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)
    const updateProfile = useUserStore((state) => state.updateProfile)

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('email', user.email)
            formData.append('password', user.password)

            const response = await axios({
                url: 'http://localhost:3030/loginProc',
                method: 'POST',
                data: formData,
                withCredentials: true
            })
            if (response.status === 200) {
                login(response.data)
                updateProfile(response.data)
                alert('로그인 성공!')
                // console.log('email: ' + response.data.email)
                // console.log('권한: ' + response.data.authorities)
                navigate("/")
            }
        } catch (error) {
            alert('로그인 실패: ' + error.message)
            console.log('로그인 에러: ', error)
        }
    }

    return (
        <>
        <Header />
            <Container>
                <div className="login-box">
                    <div className="Login-box-header">
                        <h2> 로그인 </h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="input">
                            <input type="text" name="email" placeholder="이메일을 입력해 주세요." value={user.username} onChange={handleChange}/>
                            <div className="indicator"></div>
                        </div>
                        <div className="input">
                            <input type="password" name="password" placeholder="비밀번호를 입력해 주세요." value={user.password} onChange={handleChange}/>
                            <div className="indicator"></div>
                        </div>
                        <Button type="submit"> 로그인 </Button>
                    </form>
                </div>
                <hr />
                <div className="login-btton">
                    <Link to="/register">
                        <Button> 회원 가입 </Button>
                    </Link>
                </div>
            </Container>
        <Footer />
        </>
    )
}
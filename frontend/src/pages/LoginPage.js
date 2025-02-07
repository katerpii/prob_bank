import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuthStore from '../store/authStore'
import useUserStore from '../store/userStore'
import { Container, Button } from 'react-bootstrap'

export default function LoginPage() {
    // Navigate
    const navigate = useNavigate()

    // Zustand를 통한 login state, user state 전역 관리
    const login = useAuthStore((state) => state.login)
    const updateProfile = useUserStore((state) => state.updateProfile)

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    // 입력창 변화
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    // send POST login data to Backend
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
                // update state use zustand
                login(response.data)
                updateProfile(response.data)
                alert('로그인 성공!')
                navigate("/")
            }
        } catch (error) {
            alert('로그인 실패: ' + error.message)
            // console.log('로그인 에러: ', error)
        }
    }

    return (
        <>
            <Container>
                <div className="login-box">
                    <div className="Login-box-header">
                        <h2> 로그인 </h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="input">
                            <input type="text" name="email" placeholder="이메일을 입력해 주세요." value={user.username} onChange={handleChange} />
                            <div className="indicator"></div>
                        </div>
                        <div className="input">
                            <input type="password" name="password" placeholder="비밀번호를 입력해 주세요." value={user.password} onChange={handleChange} />
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
        </>
    )
}
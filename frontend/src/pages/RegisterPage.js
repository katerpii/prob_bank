import { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const [user, setUser] = useState({
        userName: '',
        userEmail: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = async (e) => {
        e.preventDefault()
        const { id, value } = e.target
        setUser({ ...user, [id]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3030/join', user)
            alert('회원가입이 완료되었습니다!')
            navigate('/login')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <h3>회원 가입</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" id="username" placeholder="별명" onChange={handleChange} />
                <input type="password" id="password" placeholder="비밀번호" onChange={handleChange} />
                <input type="text" id="userEmail" placeholder="이메일" onChange={handleChange} />
                <Button type="submit">회원 가입</Button>
            </form>
        </>
    )
}
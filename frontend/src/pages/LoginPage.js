import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function LoginPage() {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('username', user.username)
            formData.append('password', user.password)

            const response = await axios({
                url: 'http://localhost:8000/loginProc',
                method: 'POST',
                data: formData,
                withCredentials: true,
            })
            if (response.status === 200) {
                alert('로그인 성공!')
                console.log('username: ' + response.data.username)
                console.log('권한: ' + response.data.authorities)
                navigate("/", { state: { userData: response.data } })
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
                <div className="LoginBox">
                    <div className="LoginBoxHeader">
                        <h2> Login </h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="Input">
                            <input type="text" name="username" placeholder="username" value={user.username} onChange={handleChange}></input>
                            <div className="Indicator"></div>
                        </div>
                        <div className="Input">
                            <input type="password" name="password" placeholder="password" value={user.password} onChange={handleChange}></input>
                            <div className="Indicator"></div>
                        </div>
                        <Button type="submit"> Sign-In </Button>
                    </form>
                </div>
                <hr />
                <div className="SignUpBtton">
                    <Link to="/register">
                        <Button> Sign-Up </Button>
                    </Link>
                </div>
            </Container>
        <Footer />
        </>
    )
}
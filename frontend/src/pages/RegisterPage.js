import {useEffect, useState} from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function RegisterPage(){
    const [user, setUser] = useState({
        userName: '',
        userEmail: '',
        password: ''
    })

    // async는 함수의 앞에 붙여서 해당 함수가 비동기 함수임을 나타내며, await는 비동기 함수의 실행 결과를 기다리는 키워드
    // ++) async 함수의 리턴값은 Promise 객체 
    const handleChange = async (e) => {
        e.preventDefault()
        const {id, value} = e.target
        setUser({...user, [id]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3030/join', user);
            alert('회원가입이 완료되었습니다!')
            window.location.href = '/'
        } catch (error){
            alert(error)
        }
    }

    return (
        <>
            <Header />
            <h3>회원 가입</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" id="username" placeholder="별명" onChange={handleChange}/>
                <input type="password" id="password" placeholder="비밀번호" onChange={handleChange}/>
                <input type="text" id="userEmail" placeholder="이메일" onChange={handleChange}/>
                <Button type="submit">회원 가입</Button>
            </form>
            <Footer />
        </>
    )
}
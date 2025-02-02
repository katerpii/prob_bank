import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import useUserStore from '../../store/userStore'
import { Container } from 'react-bootstrap'

export default function Profile() {
    const logout = useAuthStore((state) => state.logout)
    const profile = useUserStore((state) => state.profile)
    const navigate = useNavigate()

    return (
        <>
            <Container>
                <h2> 유저 정보 </h2>
                <hr />
                <p> 아이디: {profile.email}</p>
            </Container>
        </>
    )
}
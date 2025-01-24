import { useState,useEffect } from 'react'
import { Button, Container, Card, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import UserProfile from '../components/profile/UserProfile'
import '../styles/WritePostPage.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function WritePostPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { boardName, prevPath } = location.state || { boardName: "게시판", prevPath: "/community" }
    
    const [post, setPost] = useState({
        title: '',
        content: '',
        author: '',
        boardName: boardName
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setPost({...post, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3030/addpost', post)
            alert('게시글이 작성되었습니다!')
            navigate(prevPath)
        } catch (error) {
            alert('게시글 작성에 실패했습니다.')
            console.error(error)
        }
    }

    // 작성자 정보 가져오기 (백엔드 호출)
    useEffect(() => {
        const fetchAuthorEmail = async () => {
            try {
                const response = await axios.get('http://localhost:3030/user',{withCredentials:true,}); // 사용자 정보 요청
                
                if (response.status === 200) {
                    const { userEmail } = response.data; // 백엔드에서 반환된 user 객체의 email
                    alert(JSON.stringify(response.data));
                    setPost((prevPost) => ({
                        ...prevPost,
                        author: userEmail // 작성자 정보를 post 상태에 반영
                    }));
                }
            } catch (error) {
                alert(error);
            }
        }
        fetchAuthorEmail();
    },[]);

    return (
        <>
            <Header />
            <Container className="py-5">
                <Card className="p-4">
                    <h2 className="mb-4">{boardName} 글쓰기</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={post.title}
                                onChange={handleChange}
                                required
                                placeholder="제목을 입력해 주세요"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="content"
                                value={post.content}
                                onChange={handleChange}
                                required
                                rows={10}
                                placeholder="내용을 입력해 주세요"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>작성자 정보</Form.Label>
                            <UserProfile />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button 
                                variant="secondary" 
                                onClick={() => navigate(prevPath)}
                            >
                                취소
                            </Button>
                            <Button 
                                variant="primary" 
                                type="submit"
                            >
                                작성
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
            <Footer />
        </>
    )
}
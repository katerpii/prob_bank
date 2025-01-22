import { useState,useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import NavigateButton from '../components/common/NavigateButton'
import UserProfile from '../components/profile/UserProfile'
import '../styles/WritePostPage.css'

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
            alert('성공했슴')
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
            <div className="fixed-header">
                <div className="container">
                    <NavigateButton page={prevPath} ButtonName={boardName}/>
                    {/* <span>{boardName}</span> */}
                </div>
            </div>
            <div className="main">
                <div className="container">
                    <form className="write-post-form" onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={12} className="col-lg-8">
                                <div className="write-post-new-column forum-padding">
                                    <div>
                                        <div className="title"> 제목을 입력해 주세요. </div>
                                        <div className="input">
                                            <input size={1} name="title" value={post.title} onChange={handleChange} className="input-element"/>
                                        </div>
                                        <div className="indicator"></div>
                                    </div>
                                    <div>
                                        <div className="title"> 내용을 입력해 주세요. </div>
                                        <input className="input" name="content" value={post.content} onChange={handleChange} style={{height: "400px"}}/>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12} className="col-lg-4">
                                <div className="abstract-post-new-column forum-padding">
                                    <div className="profile">
                                        <div className="profile-header-wrapper">
                                            <div className="profile-title"> 작성자 정보 </div>
                                        </div>
                                        <UserProfile />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="button-wrapper">
                            <Button type="submit">
                                작성
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
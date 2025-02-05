import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container, Card } from 'react-bootstrap'

export default function CreateProblemPage() {
    const navigate = useNavigate()
    const [problemData, setProblemData] = useState({
        title: '',
        description: '',
        difficulty: 'EASY', // 기본값
        testCases: []
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProblemData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3030/addchallenge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(problemData)
            })

            if (response.ok) {
                alert('문제가 성공적으로 등록되었습니다.')
                navigate('/algorithm') // 문제 목록 페이지로 이동
            } else {
                throw new Error('문제 등록에 실패했습니다.')
            }
        } catch (error) {
            console.error('문제 등록 중 오류 발생:', error)
            alert('문제 등록에 실패했습니다.')
        }
    }

    return (
        <>
            <Container className="py-5">
                <Card className="p-4">
                    <h2 className="mb-4">새로운 문제 작성</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>문제 제목</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={problemData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="문제의 제목을 입력하세요"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>문제 설명</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={problemData.description}
                                onChange={handleInputChange}
                                required
                                rows={5}
                                placeholder="문제의 설명을 입력하세요"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>난이도</Form.Label>
                            <Form.Select
                                name="difficulty"
                                value={problemData.difficulty}
                                onChange={handleInputChange}
                            >
                                <option value="EASY">쉬움</option>
                                <option value="MEDIUM">보통</option>
                                <option value="HARD">어려움</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button 
                                variant="secondary" 
                                onClick={() => navigate('/algorithm')}
                            >
                                취소
                            </Button>
                            <Button 
                                variant="primary" 
                                type="submit"
                            >
                                문제 등록
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </>
    )
}

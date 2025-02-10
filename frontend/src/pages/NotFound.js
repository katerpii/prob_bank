// 수정 필요 X
import errorImage from '../assets/error.png'

export default function NotFound() {
    return (
        <>
            <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
                <img
                    src={errorImage}
                    alt='Error'
                    style={{ width: '150px', height: '150x', marginBottom: '1rem' }}
                />
                <h1 style={{ 
                    fontFamily: 'Pretendard Variable, pretendard',
                    color: '#3f3f3f',
                    fontSize: '32px',
                    fontWeight: '700'
                }}>
                    This page could not be found
                </h1>
            </Container>
        </>
    )
}
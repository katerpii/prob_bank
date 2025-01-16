import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function CustomButton({page, name}) {
    const navigate = useNavigate()
    const navigateTo = () => {
        navigate(page)
    }
    
    return (
        <Button onClick={navigateTo}> {name} </Button>
    )
}
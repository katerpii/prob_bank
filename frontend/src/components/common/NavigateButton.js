import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function NavigateButton({page, ButtonName, state}) {
    const navigate = useNavigate()
    const navigatePage = () => {
        navigate(page, { state: state })
    }
    
    return (
        <Button onClick={navigatePage}> {ButtonName} </Button>
    )
}
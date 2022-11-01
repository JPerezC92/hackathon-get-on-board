import './Modals.css'
import { useNavigate } from 'react-router-dom'

const SuccessDiv = ({children}) => {
    const navigate = useNavigate()
  return (
    <div className="successDivContainer" onClick={()=>navigate('/')}>
    <div className="successDiv"><p>{children}</p></div>
    </div>
  )
}

export default SuccessDiv
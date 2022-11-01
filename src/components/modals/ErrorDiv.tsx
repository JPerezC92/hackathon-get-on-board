import {motion } from 'framer-motion'
import {modalError} from '../../utilities/'
import './Modals.css'
const ErrorDiv = ({children}) => {
  return (
    <motion.div className='errorDiv' 
    key={'modal'}
    variants={modalError}
    initial='initialState'
    animate='animateState'
    exit='exitState'>{children}</motion.div>
  )
}

export default ErrorDiv
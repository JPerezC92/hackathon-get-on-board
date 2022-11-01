import './Recover.css'
import { useAuth } from '../../context/AuthProvider';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {BiRightArrowAlt as Arrow} from 'react-icons/bi';
import { AnimatePresence } from 'framer-motion';
import ErrorDiv from '../../components/modals/ErrorDiv';
import SuccessDiv from '../../components/modals/SuccessDiv';

const Recover = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<any>('');
    const [success, setSuccess] = useState(false);

    const { resetPassword } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (error) {
            setError('Correo electronico invalido');
        }
    };

    console.log(error);
  if(!success) return (
       <div className="recoverContainer">
      <div className='formHead'> 
        <span>
        Recuperar contrasena
      </span>
      </div>
        <form className='recoverForm' onSubmit={handleSubmit}>
             <div><label><span>Correo electronico</span>
                <input type="email" name="email" id="email" onChange={handleInputChange}/>
            </label>
          <button type="submit">{''}<Arrow style={{fontSize:"1.5rem"}}/></button>
          </div>
          <div>
					<Link to={'/login'}>Volver a Iniciar sesion</Link>
				</div>
        </form>
        <AnimatePresence>
				{error && (
					<ErrorDiv key="modal">{error}</ErrorDiv>
				)}
			</AnimatePresence>
          <img src='https://uploads-ssl.webflow.com/60832c1545a7b95d55205644/60832c1545a7b98163205661_logo-getonbrd.svg' alt='logo'/>
    </div>
  )
  return <SuccessDiv>Correo electronico enviado, podria estar en la bandeja de spam</SuccessDiv>
}

export default Recover
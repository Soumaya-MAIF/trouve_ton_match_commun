import './messages.css';
import './../../components/global.css'
import { useNavigate } from 'react-router-dom';

let mobile = true;


const Contact = ( {prenom, nom}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Redirige vers une autre page, par exemple "/message"
        // navigate(`/message/${prenom}-${nom}`);
        navigate(`/messages`);

    };

    return (
        <div onClick={handleClick} className='nom-contact'>
            {prenom} {nom}
        </div>
    )
}

export default Contact;
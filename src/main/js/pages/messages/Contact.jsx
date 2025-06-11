import './messages.css';
import './../../components/global.css'
import { useNavigate } from 'react-router';

let mobile = true;


const Contact = ({ prenom, nom, onClick }) => {
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     // Redirige vers une autre page, par exemple "/message"
    //     // navigate(`/message/${prenom}-${nom}`);
    //     navigate(`/messages`);

    // };

    return (
        // <div onClick={handleClick} className='nom-contact'>
        <div className='nom-contact' onClick={onClick}>
            {prenom} {nom}
        </div>
    )
}

export default Contact;
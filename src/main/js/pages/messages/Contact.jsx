import './messages.css';
import './../../components/global.css'

const Contact = ({ prenom, nom, onClick }) => {

    return (
        <div className='nom-contact' onClick={onClick}>
            {prenom} {nom}
        </div>
    )
}

export default Contact;
import './messages.css';
import './../../components/global.css'

const Contact = ( {prenom, nom}) => {

    return (
        <div>
            <div className='nom-contact'>{prenom} {nom}</div>
        </div>
    )
}

export default Contact;
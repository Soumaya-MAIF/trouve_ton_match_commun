import './messages.css';
import './../../components/global.css'

const Message = ( {nom, contenuMessage}) => {

    return (
        <div className='message'>
            {nom === "Moi" ? (
                <>
                    <div className='message-nom message-nom-moi'>{nom}</div>
                    <div className='message-contenu message-moi'>{contenuMessage}</div>
                </>
            ) : (
                <>
                    <div className='message-nom message-nom-contact'>{nom}</div>
                    <div className='message-contenu message-contact'>{contenuMessage}</div>
                </>
            )}
        </div>
    )
}
export default Message;
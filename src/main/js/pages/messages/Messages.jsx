import Wrapper from '../../wrapper/Index.jsx';
import Message from './Message.jsx';
import { useEffect, useState, useRef, useMemo } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { Stomp } from '@stomp/stompjs';
// import { useAuth } from '../../AuthContext';

import './messages.css';
import './../../components/global.css'
import Contact from './Contact.jsx';
import { Link } from "react-router";

const Messages = ({ isMobile }) => {

  const [loadMessage, setLoadMessages] = useState(false);
  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  const client = useMemo(()=>{
    return Stomp.client("ws://localhost:8080/ws")
  }, []);

  useEffect(()=>{
    setLoader(true);
    client.connect({}, ()=>{
      client.subscribe('/getMessages', (e)=>{
        console.log('Message reçu', e.body)
        setMessages(JSON.parse(e.body))
      });
      client.subscribe('/updateMessages', (e)=>{
        console.log('Message mis à jour', e.body)
      });
    })
  }, [client, loadMessage, setMessages, setLoader]);


    const navigate = useNavigate();

    const [hasNavigated, setHasNavigated] = useState(false);

    useEffect(() => {
        if (isMobile && !hasNavigated) {
            navigate('/messages-contacts');
            setHasNavigated(true);
        }
    }, [isMobile, hasNavigated, navigate]);

    return (
        <Wrapper>
            <section className='container-messages'>
                { !isMobile && (
                    <div className='contacts'>
                        <div className='titre-messages'>Contacts</div>
                        <Contact prenom='Laurent' nom='DUPONT' />
                        <Contact prenom='Sophie' nom='LEGRAND' />
                        <Contact prenom='Jean' nom='MARTIN' />
                        <Contact prenom='Laurent' nom='DURAND' />
                        <Contact prenom='Paul' nom='LEROY' />
                        <Contact prenom='Paul' nom='LEROY' />
                        <Contact prenom='Paul' nom='LEROY' />
                        <Contact prenom='Paul' nom='LEROY' />
                        <Contact prenom='Paul' nom='LEROY' />
                        <Contact prenom='Paul' nom='LEROY' />
                    </div>
                )}
                <div className='discussions'>
                    {/* <button class='bouton' onClick={() => client.send('/requestMessages', {}, "")}> */}
                    <button class='bouton' onClick={() => client.send('/send', {}, JSON.stringify({"sender":{"id": 1, "nom": "toto", "prenom": "tutu", "email": "toto@mail.fr"}, "dest":{"id": 2, "nom": "tata", "prenom": "tutu", "email": "tata@mail.fr"}, "content":"Test3"}))}>
                    </button>
                    <ul>
                    {messages.map((message, index)=>(<li key={`${message._id.timestamp}-${index}`}>
                        <p>{message.sender}</p>
                        <p>{message.dest}</p>
                        <p>{message.content}</p>
                    </li>))}
                    </ul>

                    {/* <Message
                        nom='Laurent'
                        contenuMessage='Bonjour Pierre, merci de me consacrer du temps. J’ai bien avancé sur mon projet de plateforme de gestion des stocks pour les petits commerces, mais j’ai encore des doutes sur certains aspects.'
                    />
                    <Message
                        nom='Moi'
                        contenuMessage='Bonjour Laurent, c’est avec plaisir ! Raconte-moi où tu en es et quelles sont tes principales interrogations.'
                    />
                    <Message
                        nom='Laurent'
                        contenuMessage='J’ai une version fonctionnelle du logiciel et quelques commerçants intéressés, mais j’hésite sur ma stratégie de commercialisation. Dois-je d’abord proposer un essai gratuit ou directement vendre mon service ?'
                    />
                    <Message
                        nom='Moi'
                        contenuMessage='Bonne question ! À ce stade, le plus important est de valider que ton produit répond bien aux attentes des commerçants. Un essai gratuit peut être un bon moyen d’attirer des utilisateurs et de recueillir leurs retours. As-tu déjà défini un modèle économique ?'
                    />
                    <Message
                        nom='Laurent'
                        contenuMessage='Oui, je pensais partir sur un abonnement mensuel, mais j’ai peur que ce soit un frein pour des petits commerces aux marges serrées.'
                    />
                    <Message
                        nom='Moi'
                        contenuMessage='C’est une bonne approche, mais tu pourrais aussi proposer une offre freemium : une version gratuite avec des fonctionnalités limitées et une version payante pour les outils avancés. Ça te permettrait d’attirer plus de monde et de les convertir progressivement.'
                    />
                    <Message
                        nom='Laurent'
                        contenuMessage='Etc.........'
                    /> */}
                </div>
            </section>
        </Wrapper>

    )
}

export default Messages;
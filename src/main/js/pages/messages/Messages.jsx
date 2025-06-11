import Wrapper from '../../wrapper/Index.jsx';
import Message from './Message.jsx';
import { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { Stomp } from '@stomp/stompjs'; // ---------------> à revoir

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// import { useAuth } from '../../components/context/AuthContext.jsx';
import { useUser } from '../../components/context/UserContext.jsx';
import { useContact } from '../../components/context/ContactContext.jsx';
import { AuthContext } from "../../components/context/AuthContext.jsx";

import './messages.css';
import './../../components/global.css'
import Contact from './Contact.jsx';
import { Link } from "react-router";
import { ChampSaisie } from '../../components/champ-saisie/ChampSaisie.jsx';
import { ZoneSaisie } from '../../components/zone-saisie/ZoneSaisie.jsx';

const otherRegex = /^[a-zA-ZÀ-ÿ\- ]{1,}$/; // minimum 2 caractères pour les autres champs

const Messages = ({ isMobile }) => {
    
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [errors, setErrors] = useState([]);
    const { auth } = useContext(AuthContext);
    const senderId = auth?.id;
    const messageInputRef = useRef(null); // Référence pour le champ de saisie du message

    const [sendMessageDto, setSendMessageDto] = useState({
        content: '',
        senderId: null,
        destId: null
    });

    const {user} = useUser(); // Récupération de l'utilisateur connecté depuis le contexte
    console.log('Utilisateur sélectionné:', user);

    const { selectedContact, setSelectedContact } = useContact(); // Récupération du contact sélectionné depuis le contexte
    console.log('Contact sélectionné:', selectedContact);

    const client = useMemo(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connecté au serveur WebSocket");

                stompClient.subscribe('/topic/getMessages', (e) => {
                    console.log('Message reçu', e.body);
                    setMessages(JSON.parse(e.body));
                });

                stompClient.subscribe('/topic/updateMessages', (e) => {
                    console.log('Message mis à jour', e.body);
                });
            },
            onStompError: (frame) => {
                console.error('Erreur STOMP', frame);
            }
        });

        stompClient.activate();
        return stompClient;
    }, []);

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        setMessages([]); // vide les anciens messages

        console.log("Client connecté ?", client?.connected);

        

        // Générer le topic WebSocket pour la conversation
        const topic =
            user.id < contact.id
                ? `/topic/getMessages/${user.id}_${contact.id}`
                : `/topic/getMessages/${contact.id}_${user.id}`;

        // Nouvel abonnement et stockage
        const abonnement = client.subscribe(topic, (message) => {
            const newMessages = JSON.parse(message.body);
            console.log('Nouveau message reçu:', newMessages);

            if (Array.isArray(newMessages)) {
                // C'est la liste complète des anciens messages
                setMessages(newMessages);
            } else {
                // Cas d’un message unique
                setMessages((prev) => [...prev, newMessages]);
            }
        });

        setSendMessageDto(prev => ({
            ...prev,
            senderId: user.id,
            destId: contact.id
        }));

        // Publier la requête pour récupérer les anciens messages
        if (client && client.connected) {
            client.publish({
                destination: "/app/requestMessages",
                body: JSON.stringify({ 
                    senderId: user.id,
                    destId: contact.id}),
            });
        } else {
            console.warn("Client STOMP non connecté");
        }
    };

    const navigate = useNavigate();

    const [hasNavigated, setHasNavigated] = useState(false);

    useEffect(() => {
        if (isMobile && !hasNavigated) {
            navigate('/messages-contacts');
            setHasNavigated(true);
        }
    }, [isMobile, hasNavigated, navigate]);

    // récupération des contacts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des utilisateurs');
                }

                const data = await response.json();
                console.log('Utilisateurs récupérés:', data);

                setContacts(data)
            } catch (error) {
                console.error('Erreur:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (name, value) => {
        setSendMessageDto({
            ...sendMessageDto,
            [name]: value
        });
        const newErrors = { ...errors };
        if (value.trim() === '') {
            newErrors[name] = 'Ce champ est requis';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };

    
    const handleSendMessage = () => {
        if (!sendMessageDto.content || !sendMessageDto.destId) {
            console.warn("Message ou destinataire manquant");
            return;
        }

        if (client && client.connected) {
            client.publish({
                destination: "/app/send",
                body: JSON.stringify({
                    senderId: sendMessageDto.senderId,
                    destId: sendMessageDto.destId,
                    content: sendMessageDto.content
                }),
            });
            console.log('Message envoyé:', sendMessageDto.content);
            console.log('Message envoyé objet:', sendMessageDto);

            // Réinitialiser le champ après envoi
            setSendMessageDto(prev => ({
                ...prev,
                content: ""
            }));
            
            // Réinitialiser la hauteur du textarea
            if (messageInputRef.current) {
                messageInputRef.current.style.height = "auto";
            }

        } else {
            console.warn("Client STOMP non connecté");
        }
    };
    
    useEffect(() => {
        if (client && client.connected && selectedContact) {
            const abonnement = client.subscribe("/topic/newMessage", (message) => {
                const newMessage = JSON.parse(message.body);
                console.log("📥 Nouveau message reçu :", newMessage);
                
                // Sécurise les IDs
                const senderId = newMessage.senderId;
                const destId = newMessage.destId;
                
                // Vérifie que le message concerne la conversation en cours
                const isCurrentConversation =
                (senderId === user.id && destId === selectedContact.id) ||
                (senderId === selectedContact.id && destId === user.id);
                
                if (isCurrentConversation) {
                    console.log("✅ Message ajouté à la conversation en cours");
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                } else {
                    console.log("ℹ️ Message reçu mais ne concerne pas la conversation en cours");
                }
            });
            
            return () => {
                console.log("🧹 Désabonnement WebSocket");
                abonnement.unsubscribe();
            };
        }
    }, [client, selectedContact, user.id]);
    
    const finDesMessagesRef = useRef(null);

    useEffect(() => {
        if (finDesMessagesRef.current) {
            finDesMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    
    return (
        <Wrapper>
            <section className='container-messages'>
                {!isMobile && (
                    <div className='contacts'>
                        <div className='titre-messages'>Contacts</div>
                        {contacts
                            .filter(contact => contact.id !== user.id) // Exclure l'utilisateur actuel
                            .map((contact) => (
                            <Contact
                                key={contact.id}
                                prenom={contact.prenom}
                                nom={contact.nom}
                                onClick={() => {
                                    handleContactClick(contact)
                                    console.log('Contact sélectionné:', contact)
                                    // setSelectedContact(contact)
                                }}
                            />
                        ))}
                        <Contact prenom='Laurent' nom='DUPONT' />

                    </div>
                )}
                <div className='discussions'>
                    {selectedContact ? (
                        <>
                            {messages.map((message) => {
                                const senderId = message.senderId ?? message.sender;
                                const estMoi = senderId === user.id;
                                const nomAffiche = estMoi ? "Moi" : selectedContact.nom;
                                console.log('estMoi:', estMoi);
                                console.log('user:', user);
                                console.log('user.nom:', user.nom);
                                console.log('nomAffiche:', nomAffiche);

                                return (
                                    <Message
                                        key={message._id}
                                        nom={nomAffiche}
                                        contenuMessage={message.content}
                                        estMoi={estMoi}
                                    />
                                );
                            })}
                            <div ref={finDesMessagesRef} />

                        </>
                    ) : (
                        <p>Sélectionnez un contact pour commencer une conversation</p>
                    )}
                    <div className='nouveau-message'>
                        {/* <ChampSaisie
                            setValue={(value) => handleChange('content', value)}
                            label="Message :"
                            name="message"
                            value={sendMessageDto.content}
                            regex={otherRegex}
                            ref={messageInputRef}
                            placeholder="Message"
                        /> */}
                        <ZoneSaisie
                            setValue={(value) => handleChange('content', value)}
                            label="Message :"
                            name="message"
                            value={sendMessageDto.content}
                            regex={otherRegex}
                            ref={messageInputRef}
                            placeholder="Message ..."
                        />

                        <div className="position-bouton">
                            <button
                                onClick={handleSendMessage}
                                type="submit"
                                className="bouton-bas-page">
                                Envoyer
                            </button>
                        </div>
                    </div>


                    {/* <Message
                        nom='Laurent'
                        contenuMessage='Bonjour Pierre, merci de me consacrer du temps. J’ai bien avancé sur mon projet de plateforme de gestion des stocks pour les petits commerces, mais j’ai encore des doutes sur certains aspects.'
                    />*/}

                </div>
            </section>
        </Wrapper>

    )
}

export default Messages;
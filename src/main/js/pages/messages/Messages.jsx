<<<<<<< HEAD
import Wrapper from "../../wrapper/Index.jsx";
import Message from "./Message.jsx";
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
import Wrapper from '../../wrapper/Index.jsx';
import Message from './Message.jsx';
=======
import Wrapper from "../../wrapper/Index.jsx";
import Message from "./Message.jsx";
import Contact from "./Contact.jsx";
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)
import { useEffect, useState, useRef, useMemo, useContext } from "react";
<<<<<<< HEAD
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Stomp } from "@stomp/stompjs"; // ---------------> à revoir
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { Stomp } from '@stomp/stompjs'; // ---------------> à revoir
=======
import { useNavigate } from "react-router";
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// import { useAuth } from '../../components/context/AuthContext.jsx';
import { useUser } from "../../components/context/UserContext.jsx";
import { useContact } from "../../components/context/ContactContext.jsx";
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// import { useAuth } from '../../components/context/AuthContext.jsx';
import { useUser } from '../../components/context/UserContext.jsx';
import { useContact } from '../../components/context/ContactContext.jsx';
=======
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)
import { AuthContext } from "../../components/context/AuthContext.jsx";

<<<<<<< HEAD
import "./messages.css";
import "./../../components/global.css";
import Contact from "./Contact.jsx";
import { ZoneSaisie } from "../../components/zone-saisie/ZoneSaisie.jsx";
import useWebSocket from "./useWebSocket.js";

||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
import './messages.css';
import './../../components/global.css'
import Contact from './Contact.jsx';
import { Link } from "react-router";
import { ChampSaisie } from '../../components/champ-saisie/ChampSaisie.jsx';
import { ZoneSaisie } from '../../components/zone-saisie/ZoneSaisie.jsx';

=======
import "./messages.css";
import "./../../components/global.css";
import { ZoneSaisie } from "../../components/zone-saisie/ZoneSaisie.jsx";
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)
const otherRegex = /^[a-zA-ZÀ-ÿ\s\-\.,;:!?()'"]{1,}$/; // minimum 2 caractères pour les autres champs

const Messages = ({ isMobile }) => {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState([]);
  const { idUtilisateur, auth } = useContext(AuthContext);
  const senderId = idUtilisateur;
  const messageInputRef = useRef(null); // Référence pour le champ de saisie du message

<<<<<<< HEAD
  const [sendMessageDto, setSendMessageDto] = useState({
    content: "",
    senderId: null,
    destId: null,
  });

  // const {user} = useUser(); // Récupération de l'utilisateur connecté depuis le contexte

  console.log("Utilisateur sélectionné:", senderId);

  // const { selectedContact, setSelectedContact } = useContact(); // Récupération du contact sélectionné depuis le contexte
  const [selectedContact, setSelectedContact] = useState();
  console.log("Contact sélectionné:", selectedContact);

  // const client = useMemo(() => {
  //   const socket = new WebSocket(`ws://localhost:8080/ws`);
  //   let stompClientRef = null;

  //   const stompClient = new Client({
  //     webSocketFactory: () => socket,
  //     reconnectDelay: 5000,
  //     onConnect: () => {
  //       console.log("Connecté au serveur WebSocket");

  //       stompClientRef.subscribe("/topic/getMessages", (e) => {
  //         console.log("Message reçu", e.body);
  //         setMessages(JSON.parse(e.body));
  //       });

  //       stompClientRef.subscribe("/topic/updateMessages", (e) => {
  //         console.log("Message mis à jour", e.body);
  //       });
  //     },
  //     onStompError: (frame) => {
  //       console.error("Erreur STOMP", frame);
  //     },
  //   });

  //   stompClientRef = stompClient;
  //   stompClient.activate();
  //   return stompClient;
  // }, []);

  const handleContactClick = (contact) => {
    if (!client || !client.connected) {
      console.warn("Client STOMP non connecté. Attente de la connexion...");
      return;
    }

    setSelectedContact(contact);
    setMessages([]);

    const topic = senderId < contact.id ? `/topic/getMessages/${senderId}_${contact.id}` : `/topic/getMessages/${contact.id}_${senderId}`; // S'abonner au topic

    client.subscribe(topic, (message) => {
      const newMessages = JSON.parse(message.body);
      console.log("Nouveau message reçu:", newMessages);

      if (Array.isArray(newMessages)) {
        setMessages(newMessages);
      } else {
        setMessages((prev) => [...prev, newMessages]);
      }
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
    const [sendMessageDto, setSendMessageDto] = useState({
        content: '',
        senderId: null,
        destId: null
=======
  console.log("Utilisateur connecté : " + idUtilisateur);

  const [sendMessageDto, setSendMessageDto] = useState({
    content: "",
    senderId: null,
    destId: null,
  });
  console.log("Utilisateur sélectionné:", senderId);

  const [selectedContact, setSelectedContact] = useState();
  // console.log("Contact sélectionné:", selectedContact);

  const [connected, setConnected] = useState(false);

  const client = useMemo(() => {
    const socket = new SockJS("http://localhost:8080/api/ws");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      brokerURL: "http://localhost:8080/api/ws",
      connectHeaders: {
        Authorization: `Bearer ${auth}`,
      },
      debug: (str) => {
        console.log("🪵 STOMP DEBUG:", str);
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ STOMP connecté");
        setConnected(true);
      },
      onStompError: (frame) => {
        console.error("❌ STOMP error:", frame);
      },
      onWebSocketError: (event) => {
        console.error("❌ WebSocket error:", event);
      },
      onWebSocketClose: () => {
        console.warn("⚠️ WebSocket fermé");
        setConnected(false);
      },
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)
    });

<<<<<<< HEAD
    setSendMessageDto((prev) => ({
      ...prev,
      senderId: senderId,
      destId: contact.id,
    })); // Publier la requête pour récupérer les anciens messages
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
    const {user} = useUser(); // Récupération de l'utilisateur connecté depuis le contexte
    console.log('Utilisateur sélectionné:', user);
=======
    stompClient.activate();
    return stompClient;
  }, [auth]);
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
    client.publish({
      destination: "/app/requestMessages",
      body: JSON.stringify({
        senderId: senderId,
        destId: contact.id,
      }),
    });
  };
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
    const { selectedContact, setSelectedContact } = useContact(); // Récupération du contact sélectionné depuis le contexte
    console.log('Contact sélectionné:', selectedContact);
=======
  const subscriptionRef = useRef(null);
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
  const navigate = useNavigate();
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
    const client = useMemo(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connecté au serveur WebSocket");
=======
  useEffect(() => {
    if (!client || !client.connected || !selectedContact || !senderId) return;
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
  const [hasNavigated, setHasNavigated] = useState(false);
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
                stompClient.subscribe('/topic/getMessages', (e) => {
                    console.log('Message reçu', e.body);
                    setMessages(JSON.parse(e.body));
                });
=======
    const topic =
      senderId < selectedContact.id
        ? `/topic/getMessages/${senderId}_${selectedContact.id}`
        : `/topic/getMessages/${selectedContact.id}_${senderId}`;
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
  useEffect(() => {
    if (isMobile && !hasNavigated) {
      navigate("/messages-contacts");
      setHasNavigated(true);
    }
  }, [isMobile, hasNavigated, navigate]);

  // récupération des contacts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
                stompClient.subscribe('/topic/updateMessages', (e) => {
                    console.log('Message mis à jour', e.body);
                });
            },
            onStompError: (frame) => {
                console.error('Erreur STOMP', frame);
            }
=======
    // Désabonnement de l'ancien topic
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    const subscription = client.subscribe(topic, (message) => {
      const newMessages = JSON.parse(message.body);
      if (Array.isArray(newMessages)) {
        setMessages(newMessages);
      } else {
        setMessages((prev) => [...prev, newMessages]);
      }
    });

    subscriptionRef.current = subscription;

    client.publish({
      destination: "/app/requestMessages",
      body: JSON.stringify({
        senderId: senderId,
        destId: selectedContact.id,
      }),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [client, selectedContact, senderId]);

  useEffect(() => {
    return () => {
      if (client && client.deactivate) {
        client.deactivate();
      }
    };
  }, [client]);

  const handleContactClick = (contact) => {
    if (!client || !client.connected) {
      console.warn("Client STOMP non connecté. Attente de la connexion...");
      return;
    }

    setSelectedContact(contact);
    setMessages([]);

    // const topic = senderId < contact.id ? `/topic/getMessages/${senderId}_${contact.id}` : `/topic/getMessages/${contact.id}_${senderId}`; // S'abonner au topic

    // client.subscribe(topic, (message) => {
    //   const newMessages = JSON.parse(message.body);
    //   console.log("Nouveau message reçu:", newMessages);

    //   if (Array.isArray(newMessages)) {
    //     setMessages(newMessages);
    //   } else {
    //     setMessages((prev) => [...prev, newMessages]);
    //   }
    // });

    setSendMessageDto((prev) => ({
      ...prev,
      senderId: senderId,
      destId: contact.id,
    })); // Publier la requête pour récupérer les anciens messages

    client.publish({
      destination: "/app/requestMessages",
      body: JSON.stringify({
        senderId: senderId,
        destId: contact.id,
      }),
    });
  };

  const navigate = useNavigate();

  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (isMobile && !hasNavigated) {
      navigate("/messages-contacts");
      setHasNavigated(true);
    }
  }, [isMobile, hasNavigated, navigate]);

  // récupération des contacts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des utilisateurs");
        }

        const data = await response.json();
        console.log("Utilisateurs récupérés:", data);

        setContacts(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

<<<<<<< HEAD
    fetchUsers();
  }, []);
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
    const navigate = useNavigate();
=======
    if (auth) {
      fetchUsers();
    }
  }, [auth]);
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

  const handleChange = (name, value) => {
    setSendMessageDto({
      ...sendMessageDto,
      [name]: value,
    });
    const newErrors = { ...errors };
    if (value.trim() === "") {
      newErrors[name] = "Ce champ est requis";
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

<<<<<<< HEAD
  // const handleSendMessage = () => {
  //   if (!sendMessageDto.content || !sendMessageDto.destId) {
  //     console.warn("Message ou destinataire manquant");
  //     return;
  //   }
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
    useEffect(() => {
        if (isMobile && !hasNavigated) {
            navigate('/messages-contacts');
            setHasNavigated(true);
        }
    }, [isMobile, hasNavigated, navigate]);
=======
  const finDesMessagesRef = useRef(null);
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
  //   if (client && client.connected) {
  //     client.publish({
  //       destination: "/app/send",
  //       body: JSON.stringify({
  //         senderId: sendMessageDto.senderId,
  //         destId: sendMessageDto.destId,
  //         content: sendMessageDto.content,
  //       }),
  //     });
  //     console.log("Message envoyé:", sendMessageDto.content);
  //     console.log("Message envoyé objet:", sendMessageDto);
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
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
=======
  useEffect(() => {
    if (finDesMessagesRef.current) {
      finDesMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
  //     // Réinitialiser le champ après envoi
  //     setSendMessageDto((prev) => ({
  //       ...prev,
  //       content: "",
  //     }));
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des utilisateurs');
                }
=======
  const handleSendMessage = () => {
    if (!sendMessageDto.content || !sendMessageDto.destId) {
      console.warn("Message ou destinataire manquant");
      return;
    }
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
  //     // Réinitialiser la hauteur du textarea
  //     if (messageInputRef.current) {
  //       messageInputRef.current.style.height = "auto";
  //     }
  //   } else {
  //     console.warn("Client STOMP non connecté");
  //   }
  // };
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
                const data = await response.json();
                console.log('Utilisateurs récupérés:', data);
=======
    client.publish({
      destination: "/app/send",
      body: JSON.stringify(sendMessageDto),
    });
    setSendMessageDto((prev) => ({ ...prev, content: "" }));
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
  // useEffect(() => {
  //   if (client && client.connected && selectedContact) {
  //     const abonnement = client.subscribe("/topic/newMessage", (message) => {
  //       const newMessage = JSON.parse(message.body);
  //       console.log("📥 Nouveau message reçu :", newMessage);
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
                setContacts(data)
            } catch (error) {
                console.error('Erreur:', error);
            }
        };
=======
    if (messageInputRef.current) {
      messageInputRef.current.style.height = "auto";
    }
  };
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
  //       // Sécurise les IDs
  //       const senderId = newMessage.senderId;
  //       const destId = newMessage.destId;
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
        fetchUsers();
    }, []);
=======
  return (
    <Wrapper>
      <p>{connected ? "Websocket connecté" : "websocket non connecté"}</p>
      <section className="container-messages">
        {!isMobile && (
          <div className="contacts">
            <div className="titre-messages">Contacts</div>
            {contacts
              .filter((contact) => contact.id !== senderId) // Exclure l'utilisateur actuel
              .map(
                (contact) => (
                  console.log("Contact:", contact),
                  (
                    <Contact
                      key={contact.id}
                      prenom={contact.prenom}
                      nom={contact.nom}
                      onClick={() => {
                        if (connected) {
                          handleContactClick(contact);
                        } else {
                          console.warn("Connexion WebSocket non encore prête.");
                        }
                        console.log("Contact sélectionné:", contact);
                        console.warn("JE CLIQUE SUR LE CONTACT");
                        setSelectedContact(contact);
                      }}
                    />
                  )
                )
              )}
          </div>
        )}
        <div className="discussions">
          {selectedContact && (
            <>
              <p className="titre-conversation">
                Conversation avec {selectedContact.prenom} {selectedContact.nom}
              </p>
              {messages.map((message) => {
                console.log("Message:", message);
                const estMoi = idUtilisateur === message.senderId;
                const nomAffiche = estMoi ? "Moi" : `${selectedContact.prenom} ${selectedContact.nom}`;
                return <Message key={message._id} nom={nomAffiche} contenuMessage={message.content} estMoi={estMoi} />;
              })}
              <div ref={finDesMessagesRef} />
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
  //       // Vérifie que le message concerne la conversation en cours
  //       const isCurrentConversation =
  //         (senderId === senderId && destId === selectedContact.id) || (senderId === selectedContact.id && destId === senderId);
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
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
=======
              <div className="nouveau-message">
                <ZoneSaisie
                  setValue={(value) => handleChange("content", value)}
                  label="Message :"
                  name="content"
                  value={sendMessageDto.content}
                  regex={otherRegex}
                  ref={messageInputRef}
                  placeholder="Message ..."
                />
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

<<<<<<< HEAD
  //       if (isCurrentConversation) {
  //         console.log("✅ Message ajouté à la conversation en cours");
  //         setMessages((prevMessages) => [...prevMessages, newMessage]);
  //       } else {
  //         console.log("ℹ️ Message reçu mais ne concerne pas la conversation en cours");
  //       }
  //     });

  //     return () => {
  //       console.log("🧹 Désabonnement WebSocket");
  //       abonnement.unsubscribe();
  //     };
  //   }
  // }, [client, selectedContact, senderId]);

  const finDesMessagesRef = useRef(null);

  useEffect(() => {
    if (finDesMessagesRef.current) {
      finDesMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const { sendMessage, isConnected } = useWebSocket({
    senderId,
    destId: selectedContact?.id,
    onMessagesReceived: setMessages,
    onNewMessage: (msg) => {
      setMessages((prev) => (prev.some((m) => m._id === msg._id) ? prev : [...prev, msg]));
    },
  });

  const handleSendMessage = () => {
    if (!sendMessageDto.content || !sendMessageDto.destId) {
      console.warn("Message ou destinataire manquant");
      return;
    }

    sendMessage(sendMessageDto.content);
    setSendMessageDto((prev) => ({ ...prev, content: "" }));

    if (messageInputRef.current) {
      messageInputRef.current.style.height = "auto";
    }
  };

  return (
    <Wrapper>
      <section className="container-messages">
        {!isMobile && (
          <div className="contacts">
            <div className="titre-messages">Contacts</div>
            {contacts
              .filter((contact) => contact.id !== senderId) // Exclure l'utilisateur actuel
              .map(
                (contact) => (
                  console.log("Contact:", contact),
                  (
                    <Contact
                      key={contact.id}
                      prenom={contact.prenom}
                      nom={contact.nom}
                      onClick={() => {
                        console.log("client : " + toString(client));
                        if (client?.connected) {
                          handleContactClick(contact);
                        } else {
                          console.warn("Connexion WebSocket non encore prête.");
                        }
                        console.log("Contact sélectionné:", contact);
                        console.warn("JE CLIQUE SUR LE CONTACT");
                        // setSelectedContact(contact)
                      }}
                    />
                  )
                )
              )}
          </div>
        )}
        <div className="discussions">
          {
            selectedContact ? (
              <>
                <p className="titre-conversation">
                  Conversation avec {selectedContact.prenom} {selectedContact.nom}
                </p>
                {messages.map((message) => {
                  const senderId = message.senderId ?? message.sender;
                  const estMoi = senderId === senderId;
                  const nomAffiche = estMoi ? "Moi" : `${selectedContact.prenom} ${selectedContact.nom}`;
                  console.log("estMoi:", estMoi);
                  // console.log('user:', user);
                  // console.log('user.nom:', user.nom);
                  console.log("nomAffiche:", nomAffiche);

                  return <Message key={message._id} nom={nomAffiche} contenuMessage={message.content} estMoi={estMoi} />;
                })}
                <div ref={finDesMessagesRef} />

                <div className="nouveau-message">
                  <ZoneSaisie
                    setValue={(value) => handleChange("content", value)}
                    label="Message :"
                    name="message"
                    value={sendMessageDto.content}
                    regex={otherRegex}
                    ref={messageInputRef}
                    placeholder="Message ..."
                  />

                  <div className="position-bouton">
                    <button onClick={handleSendMessage} type="submit" className="bouton-bas-page">
                      Envoyer
                    </button>
                  </div>
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
    
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
                                console.log('Contact:', contact),
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

                    </div>
                )}
                <div className='discussions'>
                    {selectedContact ? (
                        <>
                            <p className="titre-conversation">
                                Conversation avec {selectedContact.prenom} {selectedContact.nom}
                            </p>
                            {messages.map((message) => {
                                const senderId = message.senderId ?? message.sender;
                                const estMoi = senderId === user.id;
                                const nomAffiche = estMoi ? "Moi" : `${selectedContact.prenom} ${selectedContact.nom}`;
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
                        null
                        // <p className='titre-conversation'>Sélectionnez un contact pour commencer une conversation</p>
                    )}
                    <div className='nouveau-message'>
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
=======
                <div className="position-bouton">
                  <button onClick={handleSendMessage} type="submit" className="bouton-bas-page">
                    Envoyer
                  </button>
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)
                </div>
<<<<<<< HEAD
              </>
            ) : null
            // <p className='titre-conversation'>Sélectionnez un contact pour commencer une conversation</p>
          }
        </div>
      </section>
    </Wrapper>
  );
};
||||||| parent of c87c53d (feat(messagerie): messagerie fonctionnelle)
            </section>
        </Wrapper>
=======
              </div>
            </>
          )}
        </div>
      </section>
    </Wrapper>
  );
};
>>>>>>> c87c53d (feat(messagerie): messagerie fonctionnelle)

export default Messages;

import Wrapper from "../../wrapper/Index.jsx";
import Message from "./Message.jsx";
import { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Stomp } from "@stomp/stompjs"; // ---------------> à revoir

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// import { useAuth } from '../../components/context/AuthContext.jsx';
import { useUser } from "../../components/context/UserContext.jsx";
import { useContact } from "../../components/context/ContactContext.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";

import "./messages.css";
import "./../../components/global.css";
import Contact from "./Contact.jsx";
import { ZoneSaisie } from "../../components/zone-saisie/ZoneSaisie.jsx";
import useWebSocket from "./useWebSocket.js";

const otherRegex = /^[a-zA-ZÀ-ÿ\s\-\.,;:!?()'"]{1,}$/; // minimum 2 caractères pour les autres champs

const Messages = ({ isMobile }) => {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState([]);
  const { idUtilisateur, auth } = useContext(AuthContext);
  const senderId = idUtilisateur;
  const messageInputRef = useRef(null); // Référence pour le champ de saisie du message

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
    });

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
        const response = await fetch("http://localhost:8080/api/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
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

    fetchUsers();
  }, []);

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

  // const handleSendMessage = () => {
  //   if (!sendMessageDto.content || !sendMessageDto.destId) {
  //     console.warn("Message ou destinataire manquant");
  //     return;
  //   }

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

  //     // Réinitialiser le champ après envoi
  //     setSendMessageDto((prev) => ({
  //       ...prev,
  //       content: "",
  //     }));

  //     // Réinitialiser la hauteur du textarea
  //     if (messageInputRef.current) {
  //       messageInputRef.current.style.height = "auto";
  //     }
  //   } else {
  //     console.warn("Client STOMP non connecté");
  //   }
  // };

  // useEffect(() => {
  //   if (client && client.connected && selectedContact) {
  //     const abonnement = client.subscribe("/topic/newMessage", (message) => {
  //       const newMessage = JSON.parse(message.body);
  //       console.log("📥 Nouveau message reçu :", newMessage);

  //       // Sécurise les IDs
  //       const senderId = newMessage.senderId;
  //       const destId = newMessage.destId;

  //       // Vérifie que le message concerne la conversation en cours
  //       const isCurrentConversation =
  //         (senderId === senderId && destId === selectedContact.id) || (senderId === selectedContact.id && destId === senderId);

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
                </div>
              </>
            ) : null
            // <p className='titre-conversation'>Sélectionnez un contact pour commencer une conversation</p>
          }
        </div>
      </section>
    </Wrapper>
  );
};

export default Messages;

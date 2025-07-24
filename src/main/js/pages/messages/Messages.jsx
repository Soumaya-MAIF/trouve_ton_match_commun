import Wrapper from "../../wrapper/Index.jsx";
import Message from "./Message.jsx";
import Contact from "./Contact.jsx";
import { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { AuthContext } from "../../components/context/AuthContext.jsx";

import "./messages.css";
import "./../../components/global.css";
import { ZoneSaisie } from "../../components/zone-saisie/ZoneSaisie.jsx";
const otherRegex = /^[a-zA-ZÀ-ÿ\s\-\.,;:!?()'"]{1,}$/; // minimum 2 caractères pour les autres champs

const Messages = ({ isMobile }) => {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState([]);
  const { idUtilisateur, auth } = useContext(AuthContext);
  const senderId = idUtilisateur;
  const messageInputRef = useRef(null); // Référence pour le champ de saisie du message

  // console.log("Utilisateur connecté : " + idUtilisateur);

  const [sendMessageDto, setSendMessageDto] = useState({
    content: "",
    senderId: null,
    destId: null,
  });
  // console.log("Utilisateur sélectionné:", senderId);

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
    });

    stompClient.activate();
    return stompClient;
  }, [auth]);

  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (!client || !client.connected || !selectedContact || !senderId) return;

    const topic =
      senderId < selectedContact.id
        ? `/topic/getMessages/${senderId}_${selectedContact.id}`
        : `/topic/getMessages/${selectedContact.id}_${senderId}`;

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

    setSendMessageDto((prev) => ({
      ...prev,
      senderId: senderId,
      destId: contact.id,
    }));
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

    if (auth) {
      fetchUsers();
    }
  }, [auth]);

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

  const finDesMessagesRef = useRef(null);

  useEffect(() => {
    if (finDesMessagesRef.current) {
      finDesMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!sendMessageDto.content || !sendMessageDto.destId) {
      console.warn("Message ou destinataire manquant");
      return;
    }

    client.publish({
      destination: "/app/send",
      body: JSON.stringify(sendMessageDto),
    });
    setSendMessageDto((prev) => ({ ...prev, content: "" }));

    if (messageInputRef.current) {
      messageInputRef.current.style.height = "auto";
    }
  };

  useEffect(() => {
    if (!client || !client.connected) return;

    const subscription = client.subscribe("/topic/newMessage", (message) => {
      const newMessage = JSON.parse(message.body);
      // console.log("📥 Nouveau message reçu :", newMessage);

      // Vérifie que le message concerne la conversation en cours
      if (
        selectedContact &&
        ((newMessage.sender === senderId && newMessage.dest === selectedContact.id) ||
          (newMessage.sender === selectedContact.id && newMessage.dest === senderId))
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [client, selectedContact, senderId]);

  return (
    <Wrapper>
      {/* <p>{connected ? "Websocket connecté" : "websocket non connecté"}</p> */}
      <section className="container-messages">
        {!isMobile && (
          <div className="contacts">
            <div className="titre-messages">Contacts</div>
            {contacts
              .filter((contact) => contact.id !== senderId) // Exclure l'utilisateur actuel
              .map((contact) => (
                // console.log("Contact:", contact),
                <Contact
                  key={contact.id}
                  prenom={contact.prenom}
                  nom={contact.nom.toUpperCase()}
                  onClick={() => {
                    if (connected) {
                      handleContactClick(contact);
                    } else {
                      console.warn("Connexion WebSocket non encore prête.");
                    }
                    // console.log("Contact sélectionné:", contact);
                    // console.warn("JE CLIQUE SUR LE CONTACT");
                    setSelectedContact(contact);
                  }}
                />
              ))}
          </div>
        )}
        <div className="discussions">
          {selectedContact && (
            <>
              <p className="titre-conversation">
                Conversation avec {selectedContact.prenom} {selectedContact.nom.toUpperCase()}
              </p>
              {messages.map((message) => {
                console.log("Message:", message);
                const estMoi = idUtilisateur === message.senderId;
                const nomAffiche = estMoi ? "Moi" : `${selectedContact.prenom} ${selectedContact.nom.toUpperCase()}`;
                return <Message key={message._id} nom={nomAffiche} contenuMessage={message.content} estMoi={estMoi} />;
              })}
              <div ref={finDesMessagesRef} />

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

                <div className="position-bouton">
                  <button onClick={handleSendMessage} type="submit" className="bouton-bas-page">
                    Envoyer
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </Wrapper>
  );
};

export default Messages;

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useRef, useState } from "react";

const useWebSocket = ({ senderId, destId, onMessagesReceived, onNewMessage }) => {
  const clientRef = useRef(null);
  const subscriptionsRef = useRef({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!senderId || !destId) return;

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.host;
    const wsUrl = `${protocol}://${host}/api/ws`;

    const socket = () => new SockJS(wsUrl);
    const client = new Client({
      webSocketFactory: socket,
      reconnectDelay: 5000,
      debug: (str) => console.log("[STOMP]", str),
      onConnect: () => {
        setIsConnected(true);

        client.publish({
          destination: "/app/requestMessages",
          body: JSON.stringify({ senderId, destId }),
        });

        subscriptionsRef.current.getMessages = client.subscribe("/topic/getMessages", (e) => {
          const messages = JSON.parse(e.body);
          onMessagesReceived(messages);
        });

        subscriptionsRef.current.newMessage = client.subscribe("/topic/newMessage", (e) => {
          const newMsg = JSON.parse(e.body);
          onNewMessage(newMsg);
        });
      },
      onStompError: (frame) => {
        console.error("Erreur STOMP", frame);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      if (clientRef.current && clientRef.current.connected) {
        Object.values(subscriptionsRef.current).forEach((sub) => sub.unsubscribe());
        subscriptionsRef.current = {};
        clientRef.current.deactivate();
        setIsConnected(false);
      }
    };
  }, [senderId, destId]);

  const sendMessage = (content) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: "/app/send",
        body: JSON.stringify({ senderId, destId, content }),
      });
    } else {
      console.warn("WebSocket non connecté !");
    }
  };

  return { sendMessage, isConnected };
};

export default useWebSocket;

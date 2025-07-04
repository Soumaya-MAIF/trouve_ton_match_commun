package back.trouve_ton_match.controller;

import back.trouve_ton_match.entity.dto.RequestMessageDTO;
import back.trouve_ton_match.entity.dto.SendMessageDTO;
import back.trouve_ton_match.entity.Message;
import back.trouve_ton_match.entity.User;
import back.trouve_ton_match.entity.dto.UserDTO;
import back.trouve_ton_match.repository.UserRepository;
import back.trouve_ton_match.service.MongoService;
import back.trouve_ton_match.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.security.Principal;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.bson.BsonValue;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor
public class MessageController {

    private final MongoService mongoService;
    private final SimpMessagingTemplate template;
    private final UserService userService;

    // Map qui permet de conserver une connexion entre 2 utilisateurs actifs (pour
    // ne pas la répéter)
    // private final Map<String, Boolean> utilisateursActifs = new
    // ConcurrentHashMap<>();

    @MessageMapping("/requestMessages")
    public void openMessagePage(RequestMessageDTO request, Authentication auth) {
        // public void openMessagePage(SendMessageDTO request) {
        User sender = userService.getUserByEmail(auth.getName()).orElseThrow();
        // Long senderId = 3L;
        // Long destId = request.getDestId();

        // récupération de l'utilisateur authentifié
        System.out.println("Nom : " + sender.getNom());
        System.out.println("sender : " + sender);

        // Récupération de l'id de l'utilisateur et du destinataire
        Long senderId = sender.getId();
        Long destId = request.getDestId();

        System.out.println("📥 Requête reçue pour les messages entre " + senderId + " et " + destId);

        // Pour garantir la réciprocité du binôme
        // String Key = senderId <destId ? senderId + "_" + destId : destId + "_" +
        // senderId;
        String topic = senderId < destId
                ? "/topic/getMessages/" + senderId + "_" + destId
                : "/topic/getMessages/" + destId + "_" + senderId;

        // Récupération des messages pour la conversation entre l'expéditeur et le
        // destinataire
        var messages = mongoService.getMessagesForConversation(senderId, destId);
        // var messages = mongoService.getMessagesForConversation(3L, 2L);
        // template.convertAndSend("/topic/getMessages", messages);
        template.convertAndSend(topic, messages);

        // if (utilisateursActifs.containsKey(Key)) {
        // utilisateursActifs.put(Key, true);

        // Ecoute des nouveaux messages pour cette conversation
        mongoService.listenForNewMessages(senderId, destId)
                // mongoService.listenForNewMessages(3L, 2L)
                .forEach(doc -> {
                    switch (doc.getOperationType()) {
                        case INSERT:
                            // conversion qui permet de passer l'ObjectId en string vers le front
                            Document fullDoc = doc.getFullDocument();
                            if (fullDoc != null && fullDoc.getObjectId("_id") != null) {
                                fullDoc.put("_id", fullDoc.getObjectId("_id").toHexString());
                            }
                            template.convertAndSend("/topic/newMessage", doc.getFullDocument().toJson());
                            break;
                        case DELETE:
                            assert doc.getDocumentKey() != null;
                            template.convertAndSend("/topic/deleteMessage",
                                    doc.getDocumentKey().get("_id").asObjectId().getValue());
                            break;
                        case UPDATE:
                            assert doc.getUpdateDescription() != null;
                            assert doc.getUpdateDescription().getUpdatedFields() != null;
                            template.convertAndSend("/topic/updateMessage",
                                    doc.getUpdateDescription().getUpdatedFields().toJson());
                            break;
                        case REPLACE:
                            assert doc.getFullDocument() != null;
                            template.convertAndSend("/topic/updateMessage", doc.getFullDocument().toJson());
                            break;
                        case DROP:
                        case DROP_DATABASE:
                        case INVALIDATE:
                        case OTHER:
                        case RENAME:
                        default:
                            log.warn("Not yet implemented OperationType: {}", doc.getOperationType());
                    }
                });
    }

    // }


    @MessageMapping("/send")
    public void sendMessage(SendMessageDTO message, Authentication auth) throws Exception {
        User sender = userService.getUserByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Expéditeur non trouvé"));

        log.info("senderId: {}, destId: {}", sender.getId(), message.getDestId());

        User dest = userService.getUserById(message.getDestId())
                .orElseThrow(() -> new RuntimeException("Destinataire non trouvé"));

        String content = message.getContent();
        log.info("Message envoyé de {} à {} : {}", sender.getId(), dest.getId(), content);

        // Insertion du message
        SendMessageDTO newMessage = mongoService.insert(sender, dest, content);

        // Détermination du topic privé
        String topic = sender.getId() < dest.getId()
                ? "/topic/getMessages/" + sender.getId() + "_" + dest.getId()
                : "/topic/getMessages/" + dest.getId() + "_" + sender.getId();

        // Envoi du message uniquement sur le topic de la conversation
        template.convertAndSend(topic, newMessage);
    }

//    @MessageMapping("/send")
//    // public void sendMessage(SendMessageDTO message, Principal auth) throws Exception {
//    public void sendMessage(SendMessageDTO message) throws Exception {
//
//        log.info("🔍 senderId: {}, destId: {}", message.getSenderId(), message.getDestId());
//
//        User sender = userRepository.findById(message.getSenderId())
//            .orElseThrow(() -> new RuntimeException("Expéditeur non trouvé"));
//
//        User dest = userRepository.findById(message.getDestId())
//            .orElseThrow(() -> new RuntimeException("Destinataire non trouvé"));
//
//        // récupération de l'expéditeur et du destinataire
//        System.out.println("sender : " + sender);
//        System.out.println("dest : " + dest);
//        log.info("sender {}: " + sender);
//        log.info("dest {}: " + dest);
//
//
//        // Récupération du message
//        String content = message.getContent();
//
//        log.info("📤 Message envoyé de {} à {} : {}", sender.getId(), dest.getId(), content);
//
//        // Insertion du message dans la base de données
//        // mongoService.insert(sender, dest, content);
//
//        // Insertion du message et récupération de l'objet inséré
//        SendMessageDTO newMessage = mongoService.insert(sender, dest, message.getContent());
//
//        // Envoi du message au topic WebSocket
//        String topic = message.getSenderId() < message.getDestId()
//                ? "/topic/getMessages/" + message.getSenderId() + "_" + message.getDestId()
//                : "/topic/getMessages/" + message.getDestId() + "_" + message.getSenderId();
//
//        template.convertAndSend(topic, newMessage);
//
//    }

    @MessageMapping("/delete")
    public void deleteMessage(Map<String, String> payload, Authentication auth) {
        // Récupération de l'objectId du message
        String objectId = payload.get("_id");

        // Récupérer l'utilisateur authentifié
        String nom = auth.getName();
        User sender = userService.getUserByEmail(nom).orElseThrow();

        Optional<Document> messageToDelete = mongoService.findMessageById(objectId);

        if (messageToDelete.isEmpty()) {
            throw new RuntimeException("Message introuvable");
        }

        Document message = messageToDelete.get();

        // Vérifie si le sender du message correspond à l'utilisateur authentifié
        Long senderIdFromMessage = message.getLong("sender");
        if (!Objects.equals(senderIdFromMessage, sender.getId())) {
            throw new RuntimeException("Vous n'avez pas le droit de supprimer ce message");
        }
        // Supprimer le message
        mongoService.deleteMessageById(objectId);
        // Notifier les autres interlocuteurs
        template.convertAndSend("/deleteMessage", objectId);
    }

}
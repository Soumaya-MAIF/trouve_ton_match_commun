package back.trouve_ton_match.controller;

import back.trouve_ton_match.entity.Message;
import back.trouve_ton_match.service.MongoService;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Controller
public class MessageController {

    private MongoService mongoService;
    // private SimpMessagingTemplate template;

    public MessageController(MongoService mongoService, SimpMessagingTemplate template) {
        this.mongoService = mongoService;
        // this.template = template;
    }

    // @MessageMapping("/requestMessages")
    // public void openMessagePage() {
    //     var messages = mongoService.getMessagesForConversation("1", "2");
    //     template.convertAndSend("/getMessages", messages);

    //     mongoService.listenForNewMessages("1", "2")
    //             .forEach(doc -> {
    //                 switch (doc.getOperationType()) {
    //                     case INSERT:
    //                         template.convertAndSendToUser("1", "/newMessage", doc.getFullDocument());
    //                         break;
    //                     case DELETE:
    //                         template.convertAndSend("/deleteMessage",
    //                                 doc.getDocumentKey().get("_id").asObjectId().getValue());
    //                         break;
    //                     case UPDATE:
    //                         template.convertAndSend("/updateMessage",
    //                                 doc.getUpdateDescription().getUpdatedFields().toJson());
    //                         break;
    //                     case REPLACE:
    //                         template.convertAndSend("/updateMessage", doc.getFullDocument());
    //                         break;
    //                     case DROP:
    //                     case DROP_DATABASE:
    //                     case INVALIDATE:
    //                     case OTHER:
    //                     case RENAME:
    //                     default:
    //                         // log.warn("Not yet implemented OperationType: {}", doc.getOperationType());
    //                 }
    //             });
    // }

    // @MessageMapping("/send")
    // public void sendMessage(Message message) throws Exception {
    //     // mongoService.insert(message.getUser1(), message.getUser2(),
    //     // message.getContent());
    //     mongoService.insert(message);
    // }

    @MessageMapping("/send")
    @SendTo("/topic/message")
    public String sendMessage(Message message) throws Exception {
        return mongoService.insert(message);
    }


}
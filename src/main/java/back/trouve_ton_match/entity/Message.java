package back.trouve_ton_match.entity;


import lombok.*;
import lombok.experimental.FieldDefaults;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "messages")
public class Message {

    // private String id;
    // private User user1;
    // private User user2;
    // private String content;

    @Id
    String id;
    Long senderId; // id de l'expéditeur
    Long destId; // id du destinataire
    String content;
}

// // @Entity
// @Data
// @NoArgsConstructor
// // @Builder
// // @ReadingConverter
// // @WritingConverter
// public class Message{
//     // @Id
//     // @BsonProperty(value = "id")

//     // private ObjectId id;

//     @BsonProperty(value = "sender")
//     private String sender;

//     @BsonProperty(value = "dest")
//     private String dest;

//     @BsonProperty(value = "content")
//     private String content;
// }

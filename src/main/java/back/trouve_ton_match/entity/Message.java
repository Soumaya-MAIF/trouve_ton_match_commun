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

    @Id
    String id;
    Long senderId; // id de l'expéditeur
    Long destId; // id du destinataire
    String content;
}

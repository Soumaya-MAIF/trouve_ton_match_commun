package back.trouve_ton_match.service;

import java.io.IOException;
import java.io.ObjectInput;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import back.trouve_ton_match.entity.Message;
import back.trouve_ton_match.entity.User;
import back.trouve_ton_match.entity.dto.SendMessageDTO;
import back.trouve_ton_match.repository.MessagesRepository;
import com.mongodb.client.result.InsertOneResult;

import org.bson.BsonValue;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.mongodb.client.MongoClient;
import com.mongodb.client.ChangeStreamIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.changestream.FullDocument;
import com.mongodb.client.result.InsertOneResult;
import org.bson.types.ObjectId;

import jakarta.annotation.PostConstruct;

// @Service
// public class MongoService {

//     private final MessagesRepository messagesRepository;

//     public MongoService(MessagesRepository messagesRepository) {
//         this.messagesRepository = messagesRepository;
//     }

//    public String insert(Message message) {
//         var result = messagesRepository.insert(message);
//         return result.getId();
//     }

//     public void clearMessages() {
//         messagesRepository.deleteAll();
//     }

// }

@Service
public class MongoService {
    // si infos dans application.yml
    // @value("${spring.mongo.url}")
    // private String mongoUrl;

    // @value("${spring.mongo.db}")
    // private String mongoDb;

    private MongoClient client;
    private MongoDatabase db;
    private MongoCollection<Document> messageCollection;

   // Préparation de la connexion à MongoDB
    @PostConstruct
    void init() throws IOException {
        client = MongoClients.create("mongodb://localhost:27017");
        db = client.getDatabase("ttm");
        messageCollection = db.getCollection("messages");
    }

    public SendMessageDTO insert(User sender, User dest, String content) {
        // var newMessage = new Message({})
        messageCollection.insertOne(
            new Document("sender", sender.getId())
                .append("dest", dest.getId())
                .append("content", content)
            );

        return new SendMessageDTO(dest.getId(), content, sender.getId());
    }

    public MongoIterable<Document> getMessagesForConversation(Long user1, Long user2) {
        return messageCollection.aggregate(Arrays.asList(
                        Aggregates.match(
                                Filters.and(
                                        Filters.in("sender", user1, user2),
                                        Filters.in("dest", user1, user2)))))
                .map(document -> {
                    ObjectId objectId = document.getObjectId("_id");
                    if (objectId != null) {
                        //conversion qui permet de passer l'ObjectId en string pour le front
                        document.put("_id", objectId.toHexString());
                    }
                    return document;
                });
    }

    public ChangeStreamIterable<Document> listenForNewMessages(Long user1, Long user2) {
        return messageCollection
                .watch(Arrays.asList(
                        Aggregates.match(
                                Filters.and(
                                        Filters.in("fullDocument.sender", user1, user2),
                                        Filters.in("fullDocument.dest", user1, user2)))))
                .fullDocument(FullDocument.UPDATE_LOOKUP);
    }

    public void deleteMessageById(String objectId) {
        ObjectId id = new ObjectId(objectId);
        messageCollection.deleteOne(Filters.eq("_id", id));
    }

    public Optional<Document> findMessageById(String objectId) {
        ObjectId id = new ObjectId(objectId);
        Document doc = messageCollection.find(Filters.eq("_id", id)).first();
        return Optional.ofNullable(doc);

    }  
}
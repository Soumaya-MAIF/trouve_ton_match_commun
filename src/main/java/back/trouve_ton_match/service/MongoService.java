package back.trouve_ton_match.service;

import java.io.IOException;
import java.io.ObjectInput;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import back.trouve_ton_match.entity.Message;
import back.trouve_ton_match.repository.MessagesRepository;
import com.mongodb.client.result.InsertOneResult;
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
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.changestream.FullDocument;
import com.mongodb.client.result.InsertOneResult;
import org.bson.types.ObjectId;

import jakarta.annotation.PostConstruct;

@Service
public class MongoService {

    private final MessagesRepository messagesRepository;

    public MongoService(MessagesRepository messagesRepository) {
        this.messagesRepository = messagesRepository;
    }

   public String insert(Message message) {
        var result = messagesRepository.insert(message);
        return result.getId();
    }

    public void clearMessages() {
        messagesRepository.deleteAll();
    }

}
// @Service
// public class MongoService {
//     private MongoClient client;
//     private MongoDatabase db;
//     private MongoCollection<Message> messageCollection;
//     private CodecRegistry codec;

//     @PostConstruct
//     void init() throws IOException {
//         codec = CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build());
//         // client = MongoClients.create("mongodb://localhost:27017/?replicaSet=rs0");
//         client = MongoClients.create("mongodb://localhost:27017");
//         db = client.getDatabase("ttm").withCodecRegistry(codec);
//         messageCollection = db.getCollection("messages", Message.class);
//     }

//     private Document fromMessage(Message message) {
//         return new Document
//         ("sender", message.getSender())
//         .append("dest", message.getDest())
//         .append("content", message.getContent());
//     }

//     public void insert(Message message) {
//         // var newMessage = new Message({})
//         messageCollection.insertOne(
//                 // new Document("sender", sender.getId())
//                 // .append("dest", dest.getId())
//                 // .append("content", content));
//                 // fromMessage(message));
//                 message);
//                 // messageCollection.find().forEach(doc -> System.out.println(doc.toJson()));
//                 client.close();
//     }

//     public List<Message> getMessagesForConversation(String user1, String user2) {
//         List list = new ArrayList<>();
//         messageCollection.aggregate(Arrays.asList(
//                 Aggregates.match(
//                         Filters.and(
//                                 Filters.in("sender", user1, user2),
//                                 Filters.in("dest", user1, user2)))))
//                 .forEach(list::add);
//         return list;
//     }

//     public ChangeStreamIterable<Message> listenForNewMessages(String user1, String user2) {
//         return messageCollection
//                 .watch(Arrays.asList(
//                         Aggregates.match(
//                                 Filters.and(
//                                         Filters.in("fullDocument.sender", user1, user2),
//                                         Filters.in("fullDocument.dest", user1, user2)))))
//                 .fullDocument(FullDocument.UPDATE_LOOKUP);
//     }

// }
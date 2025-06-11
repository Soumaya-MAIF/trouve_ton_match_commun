// package back.trouve_ton_match;


// import back.trouve_ton_match.entity.Message;
// import back.trouve_ton_match.service.MongoService;
// import com.mongodb.client.result.InsertOneResult;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.context.annotation.ComponentScan;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.test.context.ContextConfiguration;
// import org.springframework.test.context.TestPropertySource;
// import org.springframework.test.context.junit.jupiter.SpringExtension;

// import static org.junit.jupiter.api.Assertions.*;

// @ExtendWith(SpringExtension.class)
// @ContextConfiguration(classes = TrouveTonMatchApplication.class)
// @TestPropertySource(value = "classpath:application.yml")
// @ComponentScan(basePackages = {"back.trouve_ton_match"})
// public class TestMongodb {

//     @Autowired
//     MongoService mongoService;


//     @Test
//     void testInsertAndReadMessage() {
//         var id = mongoService.insert(new Message(null, "sender", "dest", "testMessage"));
//         assertNotNull(id);
// //        mongoService.clearMessages();
//     }

//     @Test
//     void insertAndRead() {
// //        mongoService.clearMessages();
//         var message1Id = mongoService.insert(new Message(null, "sender", "dest", "testMessage1"));
//         mongoService.insert(new Message(null, "sender", "dest", "testMessage2"));

//     }


// }

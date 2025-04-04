package back.trouve_ton_match.repository;

import back.trouve_ton_match.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessagesRepository extends MongoRepository<Message, String> {

}

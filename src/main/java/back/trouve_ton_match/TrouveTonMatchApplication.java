package back.trouve_ton_match;

import back.trouve_ton_match.service.MongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TrouveTonMatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrouveTonMatchApplication.class, args);
	}
}

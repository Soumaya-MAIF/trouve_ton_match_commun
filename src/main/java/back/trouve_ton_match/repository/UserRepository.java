package back.trouve_ton_match.repository;
import back.trouve_ton_match.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

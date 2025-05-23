package back.trouve_ton_match.repository;
import back.trouve_ton_match.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNomOrEmail(String username, String email);

}

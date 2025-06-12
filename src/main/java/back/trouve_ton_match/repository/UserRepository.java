package back.trouve_ton_match.repository;
import back.trouve_ton_match.entity.Type;
import back.trouve_ton_match.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNomOrEmail(String username, String email);

    Optional<User> findByNom(String nom);

    Optional<User> findByEmailAndPassword(String email, String password);

    List<User> findByType(Type type);
}

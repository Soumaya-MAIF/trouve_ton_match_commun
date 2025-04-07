package back.trouve_ton_match.repository;

import back.trouve_ton_match.entity.SecteursReseaux;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecteursReseauxRepository extends JpaRepository<SecteursReseaux, Long> {
}

package back.trouve_ton_match.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "users")
@Builder
public class User {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Setter
    @Getter
    protected String nom;

    @Setter
    @Getter
    protected String prenom;

    private String password;

    protected String entreprise;

    protected String email;

    protected String code_acces;

    protected String presentation;

    protected Role role =  Role.UTILISATEUR;

    protected Type type;

}

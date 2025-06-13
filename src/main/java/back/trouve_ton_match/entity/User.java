package back.trouve_ton_match.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @Getter
    @Setter
    @Enumerated(EnumType.STRING) // pour stocker le nom de l'enum dans la BDD (et non pas l'index)
    protected Role role =  Role.UTILISATEUR;

    protected Type type;

}

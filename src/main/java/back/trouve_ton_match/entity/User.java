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
@DiscriminatorColumn(name = "type")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User {

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

    @Getter
    @Setter
    @Enumerated(EnumType.STRING) // pour stocker le nom de l'enum dans la BDD (et non pas l'index)
    protected Role role =  Role.UTILISATEUR;
    
}

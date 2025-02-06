package back.trouve_ton_match.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class  User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String prenom;

    private String entreprise;

    private String plateforme;

    private String code_acces;

    private Type type;

    private Role role =  Role.UTILISATEUR;

    @ManyToMany
    @JoinTable(
            name = "users_secteurs_reseaux",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "secteurs_reseaux_id")
    )
    private List<Secteurs_reseaux> secteurs_reseaux;

    @ManyToMany
    @JoinTable(
            name = "user_types_accompagnements",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "types_accompagnements_id")
    )
    private List<Types_accompagnements> types_accompagnements;

}

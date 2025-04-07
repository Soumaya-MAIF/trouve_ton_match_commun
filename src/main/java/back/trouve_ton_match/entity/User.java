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
@DiscriminatorColumn(name = "type")
@Inheritance(strategy = InheritanceType.JOINED)
public class  User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    protected String nom;

    protected String prenom;

    protected String entreprise;

    protected String plateforme;

    protected String code_acces;

    protected Role role =  Role.UTILISATEUR;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

    public String getPlateforme() {
        return plateforme;
    }

    public void setPlateforme(String plateforme) {
        this.plateforme = plateforme;
    }

    public String getCode_acces() {
        return code_acces;
    }

    public void setCode_acces(String code_acces) {
        this.code_acces = code_acces;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Types_accompagnements> getTypes_accompagnements() {
        return types_accompagnements;
    }

    public void setTypes_accompagnements(List<Types_accompagnements> types_accompagnements) {
        this.types_accompagnements = types_accompagnements;
    }

    public List<SecteursReseaux> getSecteurs_reseaux() {
        return secteurs_reseaux;
    }

    public void setSecteurs_reseaux(List<SecteursReseaux> secteurs_reseaux) {
        this.secteurs_reseaux = secteurs_reseaux;
    }

    @ManyToMany
    @JoinTable(
            name = "users_secteurs_reseaux",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "secteurs_reseaux_id")
    )
    private List<SecteursReseaux> secteurs_reseaux;

    @ManyToMany
    @JoinTable(
            name = "user_types_accompagnements",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "types_accompagnements_id")
    )
    private List<Types_accompagnements> types_accompagnements;

}

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

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    protected String nom;

    protected String prenom;

    protected String entreprise;

    protected String plateforme;

    protected String code_acces;

    protected Role role =  Role.UTILISATEUR;

//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getNom() {
//        return nom;
//    }
//
//    public void setNom(String nom) {
//        this.nom = nom;
//    }
//
//    public String getPrenom() {
//        return prenom;
//    }
//
//    public void setPrenom(String prenom) {
//        this.prenom = prenom;
//    }

//    public List<TypeAccompagnement> getType_accompagnement() {
//        return typeAccompagnement;
//    }
//
//    public List<SecteurReseau> getSecteurReseau() {
//        return secteursReseaus;
//    }
//
//    public void setSecteurReseau(List<SecteurReseau> secteursReseaus) {
//        this.secteursReseaus = secteursReseaus;
//    }
//
//    @ManyToMany
//    @JoinTable(
//            name = "users_secteurs_reseaux",
//            joinColumns = @JoinColumn(name = "users_id"),
//            inverseJoinColumns = @JoinColumn(name = "secteurs_reseaux_id")
//    )
//    private List<SecteurReseau> secteursReseaus;
//
//    @Setter
//    @ManyToMany
//    @JoinTable(
//            name = "user_types_accompagnements",
//            joinColumns = @JoinColumn(name = "users_id"),
//            inverseJoinColumns = @JoinColumn(name = "types_accompagnements_id")
//    )
//    private List<TypeAccompagnement> typeAccompagnement;

}

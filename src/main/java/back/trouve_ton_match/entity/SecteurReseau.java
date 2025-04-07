//package back.trouve_ton_match.entity;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.util.List;
//
//@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class SecteurReseau {
//    public Long getId() {
//        return id;
//    }
//
//    public String getNom() {
//        return nom;
//    }
//
//    public List<User> getUsers() {
//        return users;
//    }
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String nom;
//
//    @ManyToMany(mappedBy = "secteurs_reseaux")
//    private List<User> users;
//
//    @Override
//    public String toString() {
//        return "SecteursReseaux{id=" + id + ", nom='" + nom + "'}";
//    }
//}

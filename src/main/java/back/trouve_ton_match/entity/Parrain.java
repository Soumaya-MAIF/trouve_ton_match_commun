package back.trouve_ton_match.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "parrain")
public class Parrain extends User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String presentation_parcours;

    private String branche_reseau;

    private String domaine_expertise;

    private String secteur_geographique;

    private String disponibilite;

    private Type type;

}

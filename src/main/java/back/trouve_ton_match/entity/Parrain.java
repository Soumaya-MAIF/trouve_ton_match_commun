package back.trouve_ton_match.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@DiscriminatorValue("PARRAIN")
@Table(name = "parrain")
public class Parrain extends User{

    private String presentation_parcours;

    private String branche_reseau;

    private String domaine_expertise;

    private String secteur_geographique;

    private String disponibilite;


}

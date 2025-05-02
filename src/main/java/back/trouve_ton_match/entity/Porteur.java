package back.trouve_ton_match.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@DiscriminatorValue("PORTEUR")
@Table(name = "porteur")
public class Porteur extends User{

    private Date date_lancement;

    private String domaine;

    private String  descriptif_activite;

    private String besoins;

    private String lieu_activite;

    private String disponibilites;
}

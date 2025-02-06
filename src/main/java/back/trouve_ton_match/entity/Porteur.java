package back.trouve_ton_match.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "porteur")
public class Porteur extends User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date_lancement;

    private String domaine;

    private String  descriptif_activite;

    private String besoins;

    private String lieu_activite;

    private String disponibilites;

    private Type type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}

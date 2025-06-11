package back.trouve_ton_match.entity.dto;

import back.trouve_ton_match.entity.Role;
import back.trouve_ton_match.entity.Type;
import lombok.Data;

@Data
public class ProfilDTO {
    private String nom;
    private String prenom;
    private String email;
    private String entreprise;
    private Role role;
    private Type type;
}

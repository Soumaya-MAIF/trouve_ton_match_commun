package back.trouve_ton_match.entity.dto;

import back.trouve_ton_match.entity.Role;
import back.trouve_ton_match.entity.Type;
import lombok.Data;

import java.util.UUID;

@Data
public class RegisterDTO {
    private String id;
    private String nom;
    private String prenom;
    private String email;
    private String entreprise;
    private Role role;
    private Type type;
}

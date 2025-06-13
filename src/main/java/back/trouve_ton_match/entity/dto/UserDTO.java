package back.trouve_ton_match.entity.dto;

import back.trouve_ton_match.entity.Role;
import back.trouve_ton_match.entity.Type;
import back.trouve_ton_match.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private Role role;
    private Type type;

    public UserDTO(User user) {
        this.id = user.getId();
        this.nom = user.getNom();
        this.prenom = user.getPrenom();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.type = user.getType();
    }
}

package back.trouve_ton_match.entity.dto;

import back.trouve_ton_match.entity.Role;
import back.trouve_ton_match.entity.Type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactsDTO {
    private Long id;
    private String nom;
    private String prenom;
    private Role role;
    private Type profilType;

}

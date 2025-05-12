package back.trouve_ton_match.entity.dto;

import javax.management.relation.Role;

import lombok.Data;

@Data
public class PasswordDTO {
    private String email;
    private String password;
    private String role;
}

package back.trouve_ton_match.entity.dto;

import back.trouve_ton_match.entity.Role;
import back.trouve_ton_match.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParrainsDTO {
    private String id;
    private String nom;
    private String prenom;
}


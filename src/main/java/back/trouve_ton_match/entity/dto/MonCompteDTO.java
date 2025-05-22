package back.trouve_ton_match.entity.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class MonCompteDTO {
    private String id;
    private String nom;
    private String prenom;
    private String email;
    private String presentation;
}


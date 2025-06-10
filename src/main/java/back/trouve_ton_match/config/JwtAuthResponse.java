package back.trouve_ton_match.config;

import back.trouve_ton_match.entity.Role;
import back.trouve_ton_match.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String errorCode;
    private Long userId;
    private Role userRole;
    private Type userType = null;
}
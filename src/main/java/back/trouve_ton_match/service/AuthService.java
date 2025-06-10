package back.trouve_ton_match.service;

import back.trouve_ton_match.entity.dto.FirstLoginDTO;
import back.trouve_ton_match.entity.dto.LoginDTO;
import org.springframework.stereotype.Component;

@Component
public interface AuthService {
    String login(LoginDTO loginDto);
}

package back.trouve_ton_match.service;

import back.trouve_ton_match.entity.dto.FirstLoginDTO;

public interface AuthService {
    String login(FirstLoginDTO firstLoginDto);
}

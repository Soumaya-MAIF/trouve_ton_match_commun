package back.trouve_ton_match.service;

import back.trouve_ton_match.config.JwtTokenProvider;
import back.trouve_ton_match.entity.dto.FirstLoginDTO;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private AuthenticationManager authenticationManager;

    @Override
    public String login(FirstLoginDTO firstLoginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                firstLoginDto.getEmail(),
                firstLoginDto.getCode_acces()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return  jwtTokenProvider.generateToken(authentication);
    }
}
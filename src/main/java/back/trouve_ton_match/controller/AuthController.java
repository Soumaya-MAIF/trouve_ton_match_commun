package back.trouve_ton_match.controller;

import back.trouve_ton_match.config.JwtTokenUtil;
import back.trouve_ton_match.entity.*;
import back.trouve_ton_match.entity.dto.FirstLoginDTO;
import back.trouve_ton_match.entity.dto.RegisterDTO;
import back.trouve_ton_match.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import lombok.RequiredArgsConstructor;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping(consumes = "application/json", produces = "application/json")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        try {
            var authenticationToken = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
            var authentication = authenticationManager.authenticate(authenticationToken);
            var jwt = jwtTokenUtil.generateToken(authentication.getName());
            return jwt;
        } catch (AuthenticationException e) {
            return "Invalid credentials";
        }
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterDTO user) {
        User newUser = User.builder()
                .nom(user.getNom())
                .prenom(user.getPrenom())
                .email(user.getEmail())
                .role(user.getRole())
                .entreprise(user.getEntreprise())
                .code_acces(UUID.randomUUID().toString())
                .type(user.getType())
                .build();
        userService.createUser(newUser);
        return newUser;
    }

    @PostMapping("/firstLogin")
    public String firstLogin(@RequestBody FirstLoginDTO user) {
        Optional<User> userConnu = userService.getUserByEmail(user.getEmail());
        if (userConnu.isPresent()) {
            if(userConnu.get().getCode_acces().equals(user.getCode_acces())) {
                return "Vous êtes connecté";
            }
            return "je connais le user mais c'est pas le bon mdp";
        }
        return "Vous n'êtes pas connecté";
    }
}

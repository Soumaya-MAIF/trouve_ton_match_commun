package back.trouve_ton_match.controller;

import back.trouve_ton_match.entity.*;
import back.trouve_ton_match.entity.dto.FirstLoginDTO;
import back.trouve_ton_match.entity.dto.RegisterDTO;
import back.trouve_ton_match.service.UserService;
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
    private final PasswordEncoder passwordEncoder;

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

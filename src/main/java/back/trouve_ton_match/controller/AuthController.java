package back.trouve_ton_match.controller;

import back.trouve_ton_match.entity.*;
import back.trouve_ton_match.entity.dto.FirstLoginDTO;
import back.trouve_ton_match.entity.dto.PasswordDTO;
import back.trouve_ton_match.entity.dto.RegisterDTO;
import back.trouve_ton_match.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
//@RequiredArgsConstructor
@RequestMapping(consumes = "application/json", produces = "application/json")
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody RegisterDTO user) {
        User newUser = user.getType() == Type.PARRAIN ? new Parrain() : new Porteur();
        newUser.setNom(user.getNom());
        newUser.setPrenom(user.getPrenom());
        newUser.setEmail(user.getEmail());
        newUser.setRole(user.getRole());
        // newUser.setRole(Role.UTILISATEUR);
        newUser.setEntreprise(user.getEntreprise());
        newUser.setCode_acces("code");
        // newUser.setCode_acces(UUID.randomUUID().toString());
        userService.createUser(newUser);
        return newUser;
    }

    @PostMapping("/firstLogin")
    public ResponseEntity<?> firstLogin(@RequestBody FirstLoginDTO user) {
        Optional<User> userConnu = userService.getUserByEmail(user.getEmail());
        if (userConnu.isPresent()) {
            if(userConnu.get().getCode_acces().equals(user.getCode_acces())) {
                // return "Vous êtes connecté";
                return ResponseEntity.ok(Map.of(
                "success", true,
                "id", userConnu.get().getId(),
                "email", userConnu.get().getEmail(),
                "code_acces", userConnu.get().getCode_acces()
                ));
            }
            return ResponseEntity.ok(Map.of("success", false, "message", "Code d'accès incorrect"));
            // return "je connais le user mais c'estpas le bon mdp";
        }
        return ResponseEntity.ok(Map.of("success", false, "message", "Utilisateur inconnu"));
        // return "Vous n'êtes pas connecté";
    }

    @PostMapping("/mot-de-passe")
    public ResponseEntity<?> password(@RequestBody PasswordDTO user) {

        Optional<User> userConnu = userService.getUserByEmail(user.getEmail());

        if (userConnu.isPresent()) {

            User userExiste = userConnu.get();
            
            userExiste.setPassword(user.getPassword());

            userService.saveUser(userExiste);
            return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Mot de passe sauvegardé avec succès"
            ));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
            "success", false,
            "message", "Utilisateur non trouvé"
        ));
    }
  
}

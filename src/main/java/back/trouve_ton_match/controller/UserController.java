
package back.trouve_ton_match.controller;

import back.trouve_ton_match.entity.Role;
import back.trouve_ton_match.entity.User;
import back.trouve_ton_match.entity.dto.PasswordDTO;
import back.trouve_ton_match.entity.dto.MonCompteDTO;
import back.trouve_ton_match.service.UserService;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

// import org.slf4j.Logger;

@RestController
@Slf4j
@RequestMapping("api/user")
public class UserController {


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id).orElse(null);
    }

    // La méthode répond aux requêtes HTTP POST envoyées à l’URL /checkutilisateur.
    // La réponse sera au format JSON
    @PostMapping(value = "/checkutilisateur", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> checkUtilisateur(@RequestBody PasswordDTO userDto) {
        Optional<User> user = userService.getByEmailPassword(
                userDto.getEmail(),
                userDto.getPassword()
        );

        if (user.isPresent()) {
            log.info("Role de l'utilisateur : {}" + user.get().getRole());
            System.out.println("Role de l'utilisateur : " + user.get().getRole());
            boolean isAdmin = Role.ADMINISTRATEUR.equals(user.get().getRole()); // Vérifie si le rôle est ADMIN
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "id", user.get().getId(),
                    "email", user.get().getEmail(),
                    "isAdmin", isAdmin
            ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", "Utilisateur non trouvé ou mot de passe incorrect"
            ));
        }


        // Vérifie si un utilisateur est trouvé et renvoie une réponse adéquate
        // return user
        //         .map(ResponseEntity::ok)
        //         .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // La méthode répond aux requêtes HTTP POST envoyées à l’URL /checkutilisateur.
    // La réponse sera au format JSON
    @PutMapping(value = "/monCompte/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<?> saveMonCompte(@RequestBody MonCompteDTO userDto) {
    public ResponseEntity<?> saveMonCompte(
            @PathVariable(value = "id", required = true) String id,
            @RequestBody MonCompteDTO userDto) {
        Optional<User> userExist = userService.getUserByEmail(
                userDto.getEmail()
        );

        if (userExist.isPresent()) {
            User user = userExist.get();
            user.setNom(userDto.getNom());
            user.setPrenom(userDto.getPrenom());
            // user.setEmail(userDto.getEmail());
            user.setPresentation(userDto.getPresentation()); // Assurez-vous que ce champ est bien mis à jour
            userService.saveUser(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        }
    }

    @PatchMapping("/password")
    public ResponseEntity <String> updatePassword(@RequestBody PasswordDTO passwordDTO) {
        Optional<User> userConnu = service.getUserByEmail(passwordDTO.getEmail());
        if (userConnu.isPresent()) {
            User user = userConnu.get();
            String encodedPassword = passwordEncoder.encode(passwordDTO.getMot_de_passe());
            user.setPassword(encodedPassword);
            service.save(user);
                return new ResponseEntity<>("Mot de passe enregistré", HttpStatus.OK);

        }
        return new ResponseEntity<>( "Erreur lors de l'enregistrement du mot de passe", HttpStatus.I_AM_A_TEAPOT);
    }


    @PatchMapping("/password")
    public ResponseEntity <String> updatePassword(@RequestBody PasswordDTO passwordDTO) {
        Optional<User> userConnu = service.getUserByEmail(passwordDTO.getEmail());
        if (userConnu.isPresent()) {
            User user = userConnu.get();
            String encodedPassword = passwordEncoder.encode(passwordDTO.getMot_de_passe());
            user.setPassword(encodedPassword);
            service.save(user);
                return new ResponseEntity<>("Mot de passe enregistré", HttpStatus.OK);

        }
        return new ResponseEntity<>( "Erreur lors de l'enregistrement du mot de passe", HttpStatus.I_AM_A_TEAPOT);
    }


}

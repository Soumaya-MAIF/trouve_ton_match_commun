
package back.trouve_ton_match.controller;

import back.trouve_ton_match.entity.Role;
import back.trouve_ton_match.entity.User;
import back.trouve_ton_match.entity.dto.PasswordDTO;
import back.trouve_ton_match.service.UserService;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import org.slf4j.Logger;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {


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

}

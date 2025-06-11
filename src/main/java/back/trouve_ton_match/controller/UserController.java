
package back.trouve_ton_match.controller;

import back.trouve_ton_match.entity.Role;
import back.trouve_ton_match.entity.User;
import back.trouve_ton_match.entity.dto.PasswordDTO;
import back.trouve_ton_match.entity.dto.ContactsDTO;
import back.trouve_ton_match.entity.dto.MonCompteDTO;
import back.trouve_ton_match.entity.dto.PresentationDTO;
import back.trouve_ton_match.service.UserService;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return service.getUserById(id).orElse(null);
    }

    @GetMapping("/")
    public ResponseEntity<List<ContactsDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
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
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

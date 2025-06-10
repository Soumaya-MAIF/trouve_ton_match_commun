
package back.trouve_ton_match.controller;

import back.trouve_ton_match.entity.User;
import back.trouve_ton_match.entity.dto.PasswordDTO;
import back.trouve_ton_match.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/user")
public class UserController {


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @Autowired
    private UserService service;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return service.getUserById(id).orElse(null);
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

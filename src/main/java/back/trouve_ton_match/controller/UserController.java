
package back.trouve_ton_match.controller;

import back.trouve_ton_match.entity.Role;
import back.trouve_ton_match.entity.User;
import back.trouve_ton_match.entity.dto.PasswordDTO;
import back.trouve_ton_match.entity.dto.MonCompteDTO;
import back.trouve_ton_match.entity.dto.PresentationDTO;
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


@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @Autowired
    private UserService service;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return service.getUserById(id).orElse(null);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody PresentationDTO presentationDto) {
        Optional<User> userOptional = service.getUserById(id);
        if (userOptional.isPresent()) {
            User userConnu = userOptional.get();
            userConnu.setPresentation(presentationDto.getPresentation());
            service.save(userConnu);
            return new ResponseEntity<>(userConnu, HttpStatus.OK);
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

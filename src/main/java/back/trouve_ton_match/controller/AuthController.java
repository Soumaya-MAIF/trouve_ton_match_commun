package back.trouve_ton_match.controller;

import back.trouve_ton_match.config.JwtAuthResponse;
import back.trouve_ton_match.config.JwtTokenProvider;
import back.trouve_ton_match.entity.*;
import back.trouve_ton_match.entity.dto.FirstLoginDTO;
import back.trouve_ton_match.entity.dto.LoginDTO;
import back.trouve_ton_match.entity.dto.RegisterDTO;
import back.trouve_ton_match.service.AuthService;
import back.trouve_ton_match.service.UserService;
import back.trouve_ton_match.service.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


import lombok.RequiredArgsConstructor;

import java.util.Optional;
import java.util.UUID;

//@RequiredArgsConstructor
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserServiceImpl userServiceImpl;

        private final UserService userService;
//    private final AuthenticationManager authenticationManager;
//    private final JwtTokenProvider jwtTokenProvider;
//
//    @Autowired
//    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserService userService, JwtTokenProvider jwtTokenProvider1) {
//        this.authenticationManager = authenticationManager;
//        this.jwtTokenProvider = jwtTokenProvider;
//        this.userService = userService;
//    }
//
//    @PostMapping("/login")
//    public String login(@RequestBody User user) {
//        try {
//            var authenticationToken = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
//            var authentication = authenticationManager.authenticate(authenticationToken);
//            var jwt = jwtTokenProvider.generateToken(authentication);
//            return jwt;
//        } catch (AuthenticationException e) {
//            return "Invalid credentials";
//        }
//    }
//
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
        userServiceImpl.createUser(newUser);
        return newUser;
    }

    @PostMapping("/firstLogin")
    public ResponseEntity<String> firstLogin(@RequestBody FirstLoginDTO user) {
        Optional<User> userConnu = userService.getUserByEmail(user.getEmail());
        if (userConnu.isPresent()) {
            if(userConnu.get().getCode_acces().equals(user.getCode_acces())) {
                return new ResponseEntity<>("Nous vous avons trouvé", HttpStatus.OK);
            }
            return new ResponseEntity<>( "je connais le user mais c'est pas le bon code d'acces", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>( "Vous n'êtes pas connecté", HttpStatus.I_AM_A_TEAPOT);
    }

    @Autowired
    private AuthService authService;

    // Build Login REST API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDto){
        try {
        String token = authService.login(loginDto);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        System.out.println("vous êtes bien connecté");
        return ResponseEntity.ok(jwtAuthResponse);
        } catch (BadCredentialsException e) {
            return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Identifiants incorrects. Veuillez réessayer.");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Utilisateur non trouvé.");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Une erreur est survenue lors de la connexion.");
        }
    }}






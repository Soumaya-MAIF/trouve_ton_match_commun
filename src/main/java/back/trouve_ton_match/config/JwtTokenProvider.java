package back.trouve_ton_match.config;

import back.trouve_ton_match.entity.User;
import back.trouve_ton_match.entity.dto.UserDTO;
import back.trouve_ton_match.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.channels.NotYetConnectedException;
import java.security.Key;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;

@Component
public class JwtTokenProvider {

    private final UserRepository userRepository;
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    public JwtTokenProvider(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String generateToken(Authentication auth) {

        String email = auth.getName();

        Date currentDate = new Date();

        Date expireDate = new Date(currentDate.getTime() + expiration);

        User user = userRepository.findByNomOrEmail("", email).orElseThrow(NotYetConnectedException::new);

        UserDTO userDTO = new UserDTO(user);

        String token = Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(expireDate)
                .claim("user", userDTO)
                .signWith(key())
                .compact();

        System.out.println("Generated token: " + token);
        return token;


    }

    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public String getEmail(String token){

        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }


    public Boolean validateToken(String token) {
        Jwts.parser().verifyWith((SecretKey) key())
                .build()
                .parse(token);
        return true;
    }

    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).build().parseSignedClaims(token).getPayload();
    }
}



//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.jackson.io.JacksonDeserializer;
//import io.jsonwebtoken.jackson.io.JacksonSerializer;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Component;
//
//import javax.crypto.SecretKey;
//import java.security.Key;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;
//
//@Component
//public class JwtTokenProvider {
//
//    @Value("${jwt.secret}")
//    private String secret;
//
//    @Value("${jwt.expiration}")
//    private Long expiration;
//
//    private Key key() {
//        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
//    }
//
//    public String generateToken(Authentication auth) {
//        String email = auth.getName();
//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + expiration);
//
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("sub", email);
//        claims.put("created", now);
//
//        return Jwts.builder()
//                .serializeToJsonWith(new JacksonSerializer<>())
//                .claims(claims)
//                .issuedAt(now)
//                .expiration(expiryDate)
//                .signWith(key())
//                .compact();
//    }
//
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parserBuilder()
//                    .deserializeJsonWith(new JacksonDeserializer<>())
//                    .setSigningKey(key())
//                    .build()
//                    .parseClaimsJws(token);
//            return true;
//        } catch (Exception ex) {
//            return false;
//        }
//    }
//
//    public String getEmailFromToken(String token) {
//        return getClaimFromToken(token, Claims::getSubject);
//    }
//
//    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = getAllClaimsFromToken(token);
//        return claimsResolver.apply(claims);
//    }
//
//    private Claims getAllClaimsFromToken(String token) {
//        return Jwts.parserBuilder()
//                .deserializeJsonWith(new JacksonDeserializer<>())
//                .setSigningKey(key())
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }
//}


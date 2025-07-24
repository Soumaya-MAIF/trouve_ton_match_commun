package back.trouve_ton_match.config;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

@Component
public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtHandshakeInterceptor(final JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {

        if (request instanceof ServletServerHttpRequest servletRequest) {
            System.out.println(servletRequest.getServletRequest().getHeaderNames());
            String[] authorization = servletRequest.getHeaders().getFirst("Authorization").split(" ");
            String type = authorization[0];
            String token = authorization[1];
            // Valider le token ici (ex: via JwtUtils) et stocker l'utilisateur dans les attributs
            if (type != null && type.toLowerCase().equals("bearer") && token != null && jwtTokenProvider.validateToken(token)) {
                String nom = jwtTokenProvider.getNomFromToken(token);
                attributes.put("nom", nom);
            } else {
                return false; // Refuser la connexion
            }
        }
        return true;

    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}

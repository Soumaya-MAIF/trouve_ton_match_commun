package back.trouve_ton_match.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtHandshakeInterceptor jwtHandshakeInterceptor;

    public WebSocketConfig(final JwtHandshakeInterceptor jwtHandshakeInterceptor) {
        this.jwtHandshakeInterceptor = jwtHandshakeInterceptor;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // définit le préfixe d’accès au flux émis par le broker pour les clients souhaitant s’y inscrire.
        registry.setApplicationDestinationPrefixes("/app"); // définit le préfixe d’accès aux éventuels contrôleurs que les clients pourront consommer dans votre API.
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
            .setAllowedOriginPatterns("http://localhost:3000"); // définit le point d’entrée pour le handshake entre le client et le serveur. Cela

        registry.addEndpoint("/ws")
//                .addInterceptors(jwtHandshakeInterceptor)
                .setAllowedOriginPatterns("http://localhost:3000") // définit le point d’entrée pour le handshake entre le client et le serveur. Cela
        // permet d’établir la connexion ouverte entre les deux services.
            .withSockJS();
    }
}

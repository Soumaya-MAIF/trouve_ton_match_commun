package back.trouve_ton_match.service;

import back.trouve_ton_match.entity.User;
import back.trouve_ton_match.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

public interface UserService {

    public Optional<User> getUserById(@PathVariable Long id);

    public User createUser(User user);

    public Optional<User> getUserByEmail(String email);

    void save(User user);

    public Optional<User> getByEmailPassword(String email, String password);

    public User saveUser(User user);
}


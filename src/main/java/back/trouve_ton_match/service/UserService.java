package back.trouve_ton_match.service;

import back.trouve_ton_match.entity.User;
import back.trouve_ton_match.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;



    public Optional<User> getUserById(@PathVariable Long id) {
        return repository.findById(id);
    }

    public User createUser(User user) {
        return repository.save(user);
    }
}


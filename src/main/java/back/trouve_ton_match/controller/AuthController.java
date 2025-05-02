package fr.simplon.brief20.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import fr.simplon.brief20.dto.RegisterDTO;
import fr.simplon.brief20.model.User;
import fr.simplon.brief20.service.UserService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/login")
    public String login() {
        return "pages/login";
    }

    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("user", User.builder().build());
        return "pages/register";
    }

    @PostMapping("/register")
    public String register(@ModelAttribute RegisterDTO user, Model model) {
        userService.saveUser(User.builder()
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(User.Role.CUSTOMER)
                .build()
        );
        model.addAttribute("registerSuccess", true);
        return "pages/login";
    }
}

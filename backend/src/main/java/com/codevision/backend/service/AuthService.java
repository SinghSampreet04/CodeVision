package com.codevision.backend.service;

import com.codevision.backend.dto.LoginRequest;
import com.codevision.backend.dto.LoginResponse;
import com.codevision.backend.dto.RegisterRequest;
import com.codevision.backend.dto.UserResponse;
import com.codevision.backend.entity.User;
import com.codevision.backend.exception.EmailAlreadyExistsException;
import com.codevision.backend.exception.InvalidCredentialsException;
import com.codevision.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse register(
            RegisterRequest request
    ) {

        if (userRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            throw new EmailAlreadyExistsException(
                    "Email already exists"
            );
        }

        User user = new User();

        user.setUsername(
                request.getUsername()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole("USER");

        User savedUser =
                userRepository.save(user);

        UserResponse response =
                new UserResponse();

        response.setId(
                savedUser.getId()
        );

        response.setUsername(
                savedUser.getUsername()
        );

        response.setEmail(
                savedUser.getEmail()
        );

        response.setRole(
                savedUser.getRole()
        );

        return response;
    }

    public LoginResponse login(
            LoginRequest request
    ) {

        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(
                                () -> new InvalidCredentialsException(
                                        "Invalid email or password"
                                )
                        );

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {

            throw new InvalidCredentialsException(
                    "Invalid email or password"
            );
        }

        LoginResponse response =
                new LoginResponse();

        response.setMessage(
                "Login successful"
        );

        response.setUserId(
                user.getId()
        );

        response.setUsername(
                user.getUsername()
        );

        response.setEmail(
                user.getEmail()
        );

        response.setRole(
                user.getRole()
        );

        return response;
    }
}
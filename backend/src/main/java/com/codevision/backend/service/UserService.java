package com.codevision.backend.service;

import com.codevision.backend.dto.CreateUserRequest;
import com.codevision.backend.dto.UserResponse;
import com.codevision.backend.entity.User;
import com.codevision.backend.exception.EmailAlreadyExistsException;
import com.codevision.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    public UserResponse createUser(
            CreateUserRequest request
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
                request.getPassword()
        );

        user.setRole(
                request.getRole()
        );

        User savedUser =
                userRepository.save(user);

        return mapToResponse(
                savedUser
        );
    }

    public List<UserResponse> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private UserResponse mapToResponse(
            User user
    ) {

        UserResponse response =
                new UserResponse();

        response.setId(
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
package com.codevision.backend.controller;

import com.codevision.backend.dto.CreateUserRequest;
import com.codevision.backend.dto.UserProfileResponse;
import com.codevision.backend.dto.UserResponse;
import com.codevision.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService
    ) {

        this.userService =
                userService;
    }

    @PostMapping
    public UserResponse createUser(
            @Valid
            @RequestBody
            CreateUserRequest request
    ) {

        return userService.createUser(
                request
        );
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {

        return userService.getAllUsers();
    }
@GetMapping("/profile")
public UserProfileResponse getProfile(
        Authentication authentication
) {

    System.out.println("--------------------------------");
    System.out.println("Authentication Object:");
    System.out.println(authentication);

    if (authentication == null) {

        System.out.println("Authentication is NULL");

        throw new RuntimeException(
                "Authentication is NULL"
        );
    }

    System.out.println("Authenticated User:");
    System.out.println(authentication.getName());

    System.out.println("--------------------------------");

    return userService.getProfile(
            authentication.getName()
    );
}
}
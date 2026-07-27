package com.codevision.backend.controller;

import com.codevision.backend.dto.CreateUserRequest;
import com.codevision.backend.dto.UserProfileResponse;
import com.codevision.backend.dto.UserResponse;
import com.codevision.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
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
    return userService.getProfile(
            authentication.getName()
    );
}
}

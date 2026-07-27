package com.codevision.backend.controller;

import com.codevision.backend.dto.LoginRequest;
import com.codevision.backend.dto.LoginResponse;
import com.codevision.backend.dto.RegisterRequest;
import com.codevision.backend.dto.UserResponse;
import com.codevision.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(
            @Valid
            @RequestBody
            RegisterRequest request
    ) {

        return authService.register(
                request
        );
    }

    @PostMapping("/login")
    public LoginResponse login(
            @Valid
            @RequestBody
            LoginRequest request
    ) {

        return authService.login(
                request
        );
    }
}

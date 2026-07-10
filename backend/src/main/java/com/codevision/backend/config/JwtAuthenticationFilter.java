package com.codevision.backend.config;

import com.codevision.backend.entity.User;
import com.codevision.backend.repository.UserRepository;
import com.codevision.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserRepository userRepository
    ) {

        this.jwtService =
                jwtService;

        this.userRepository =
                userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

       System.out.println("--------------------------------");
System.out.println(request.getMethod());
System.out.println(request.getRequestURI());

String header =
        request.getHeader(
                "Authorization"
        );

System.out.println("Authorization Header:");
System.out.println(header);

        if (
                header != null &&
                header.startsWith(
                        "Bearer "
                )
        ) {
                System.out.println("Bearer token found");

            String token =
                    header.substring(
                            7
                    );

         System.out.println("Checking token...");

boolean valid = jwtService.isValid(token);

System.out.println("TOKEN VALID = " + valid);

if (valid)  {

    String email =
            jwtService.extractEmail(
                    token
            );

    System.out.println("EMAIL = " + email);

    User user =
            userRepository
                    .findByEmail(
                            email
                    )
                    .orElse(null);

    System.out.println("USER = " + user);

    if (
            user != null
    ) {

        UsernamePasswordAuthenticationToken
                authentication =
                new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        AuthorityUtils.createAuthorityList(
                                "ROLE_" + user.getRole()
                        )
                );

        SecurityContextHolder
                .getContext()
                .setAuthentication(
                        authentication
                );

        System.out.println(
                "AUTH = "
                        + SecurityContextHolder
                        .getContext()
                        .getAuthentication()
        );
    }
}
        }

        filterChain.doFilter(
                request,
                response
        );
    }
}
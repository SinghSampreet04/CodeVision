package com.codevision.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter
            jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {

        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .cors(
                        Customizer.withDefaults()
                )

                .csrf(
                        csrf -> csrf.disable()
                )

                .sessionManagement(
                        session ->
                                session.sessionCreationPolicy(
                                        SessionCreationPolicy.STATELESS
                                )
                )

                .authorizeHttpRequests(
                        auth -> auth

                                .requestMatchers(
                                        HttpMethod.OPTIONS,
                                        "/**"
                                )
                                .permitAll()

                                .requestMatchers(
                                        "/auth/**"
                                )
                                .permitAll()

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/problems/**"
                                )
                                .permitAll()

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/problems"
                                )
                                .hasRole(
                                        "ADMIN"
                                )

                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/problems/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )

                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/problems/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/contests/**"
                                )
                                .permitAll()

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/contests/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )

                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/contests/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )

                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/contests/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/discussions/**"
                                )
                                .permitAll()

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/discussions"
                                )
                                .authenticated()

                                .requestMatchers(
                                        "/execute/**"
                                )
                                .permitAll()

                                .requestMatchers(
                                        "/submissions/leaderboard/**"
                                )
                                .permitAll()

                                .requestMatchers(
                                        "/submissions/stats/**"
                                )
                                .permitAll()

                                .requestMatchers(
                                        "/submissions/**"
                                )
                                .authenticated()

                                .anyRequest()
                                .permitAll()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                .httpBasic(
                        Customizer.withDefaults()
                );

        return http.build();
    }
}
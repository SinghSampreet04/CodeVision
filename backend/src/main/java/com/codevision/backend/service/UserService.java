package com.codevision.backend.service;

import com.codevision.backend.dto.CreateUserRequest;
import com.codevision.backend.dto.UserProfileResponse;
import com.codevision.backend.dto.UserResponse;
import com.codevision.backend.entity.Submission;
import com.codevision.backend.entity.User;
import com.codevision.backend.exception.EmailAlreadyExistsException;
import com.codevision.backend.repository.SubmissionRepository;
import com.codevision.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final SubmissionRepository submissionRepository;

    public UserService(
            UserRepository userRepository,
            SubmissionRepository submissionRepository
    ) {

        this.userRepository =
                userRepository;

        this.submissionRepository =
                submissionRepository;
    }

    public UserResponse createUser(
            CreateUserRequest request
    ) {

        if (
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .isPresent()
        ) {

            throw new EmailAlreadyExistsException(
                    "Email already exists"
            );
        }

        User user =
                new User();

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
                userRepository.save(
                        user
                );

        return mapToResponse(
                savedUser
        );
    }

    public List<UserResponse> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(
                        this::mapToResponse
                )
                .toList();
    }

    public UserProfileResponse getProfile(
            String email
    ) {

        User user =
                userRepository
                        .findByEmail(
                                email
                        )
                        .orElseThrow();

        long totalSubmissions =
                submissionRepository
                        .countByUserId(
                                user.getId()
                        );

        long acceptedSubmissions =
                submissionRepository
                        .countByUserIdAndStatus(
                                user.getId(),
                                "ACCEPTED"
                        );

        double acceptanceRate = 0.0;

        if (
                totalSubmissions > 0
        ) {

            acceptanceRate =
                    (
                            acceptedSubmissions
                            * 100.0
                    )
                    / totalSubmissions;
        }

        List<Submission> submissions =
                submissionRepository
                        .findByUserId(
                                user.getId()
                        );

        Set<Long> solvedProblems =
                new HashSet<>();

        long easySolved = 0;
        long mediumSolved = 0;
        long hardSolved = 0;

        for (
                Submission submission
                : submissions
        ) {

            if (
                    !"ACCEPTED".equals(
                            submission.getStatus()
                    )
            ) {

                continue;
            }

            Long problemId =
                    submission
                            .getProblem()
                            .getId();

            if (
                    solvedProblems.contains(
                            problemId
                    )
            ) {

                continue;
            }

            solvedProblems.add(
                    problemId
            );

            String difficulty =
                    submission
                            .getProblem()
                            .getDifficulty();

            if (
                    "Easy".equalsIgnoreCase(
                            difficulty
                    )
            ) {

                easySolved++;
            }

            else if (
                    "Medium".equalsIgnoreCase(
                            difficulty
                    )
            ) {

                mediumSolved++;
            }

            else if (
                    "Hard".equalsIgnoreCase(
                            difficulty
                    )
            ) {

                hardSolved++;
            }
        }

        UserProfileResponse response =
                new UserProfileResponse();

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

        response.setTotalSubmissions(
                totalSubmissions
        );

        response.setAcceptedSubmissions(
                acceptedSubmissions
        );

        response.setAcceptanceRate(
                Math.round(
                        acceptanceRate * 100
                ) / 100.0
        );

        response.setSolvedProblems(
                (long) solvedProblems.size()
        );

        response.setEasySolved(
                easySolved
        );

        response.setMediumSolved(
                mediumSolved
        );

        response.setHardSolved(
                hardSolved
        );

        return response;
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
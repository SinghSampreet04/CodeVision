package com.codevision.backend.service;

import com.codevision.backend.dto.LeaderboardEntryResponse;
import com.codevision.backend.entity.Submission;
import com.codevision.backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {

    private final SubmissionRepository
            submissionRepository;

    public LeaderboardService(
            SubmissionRepository submissionRepository
    ) {

        this.submissionRepository =
                submissionRepository;
    }

    public List<LeaderboardEntryResponse>
    getLeaderboard(
            Long problemId
    ) {

        List<Submission> submissions =
                submissionRepository
                        .findByProblemIdAndStatusOrderByRuntimeAsc(
                                problemId,
                                "ACCEPTED"
                        );

        Map<String, Submission>
                bestSubmissionPerUser =
                new HashMap<>();

        for (
                Submission submission
                        : submissions
        ) {

            if (
                    submission.getRuntime()
                            == null
            ) {

                continue;
            }

            String username =
                    submission
                            .getUser()
                            .getUsername();

            Submission existing =
                    bestSubmissionPerUser
                            .get(username);

            if (
                    existing == null
            ) {

                bestSubmissionPerUser.put(
                        username,
                        submission
                );

                continue;
            }

            if (
                    submission.getRuntime()
                            <
                    existing.getRuntime()
            ) {

                bestSubmissionPerUser.put(
                        username,
                        submission
                );
            }
        }

        return bestSubmissionPerUser
                .values()
                .stream()
                .sorted(
                        Comparator.comparing(
                                Submission::getRuntime
                        )
                )
                .map(
                        submission -> {

                            LeaderboardEntryResponse
                                    response =
                                    new LeaderboardEntryResponse();

                            response.setUsername(
                                    submission
                                            .getUser()
                                            .getUsername()
                            );

                            response.setRuntime(
                                    submission
                                            .getRuntime()
                            );

                            response.setSubmissionId(
                                    submission
                                            .getId()
                            );

                            return response;
                        }
                )
                .collect(
                        Collectors.toList()
                );
    }
}
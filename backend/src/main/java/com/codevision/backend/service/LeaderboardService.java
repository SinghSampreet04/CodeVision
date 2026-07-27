package com.codevision.backend.service;

import com.codevision.backend.dto.LeaderboardEntryResponse;
import com.codevision.backend.entity.Submission;
import com.codevision.backend.repository.ProblemRepository;
import com.codevision.backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {

    private final SubmissionRepository
            submissionRepository;

    private final ProblemRepository problemRepository;

    public LeaderboardService(
            SubmissionRepository submissionRepository,
            ProblemRepository problemRepository
    ) {

        this.submissionRepository =
                submissionRepository;

        this.problemRepository =
                problemRepository;
    }

    public List<LeaderboardEntryResponse>
    getLeaderboard(
            Long problemId
    ) {
        if (!problemRepository.existsById(problemId)) {
            throw new NoSuchElementException("Problem not found");
        }

        List<Submission> submissions =
                submissionRepository
                        .findByProblemIdAndStatusOrderByRuntimeAsc(
                                problemId,
                                "ACCEPTED"
                        );

        Map<Long, Submission>
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

            Long userId = submission.getUser().getId();

            Submission existing =
                    bestSubmissionPerUser
                            .get(userId);

            if (
                    existing == null
            ) {

                bestSubmissionPerUser.put(
                        userId,
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
                        userId,
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

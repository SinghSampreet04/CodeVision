package com.codevision.backend.service;

import com.codevision.backend.dto.LeaderboardEntryResponse;
import com.codevision.backend.entity.Submission;
import com.codevision.backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

        return submissions
                .stream()
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
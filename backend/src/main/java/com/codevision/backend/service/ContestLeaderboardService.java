package com.codevision.backend.service;

import com.codevision.backend.dto.ContestLeaderboardEntry;
import com.codevision.backend.entity.Submission;
import com.codevision.backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ContestLeaderboardService {

    private final SubmissionRepository
            submissionRepository;

    public ContestLeaderboardService(
            SubmissionRepository submissionRepository
    ) {

        this.submissionRepository =
                submissionRepository;
    }

    public List<ContestLeaderboardEntry>
    getLeaderboard(
            Long contestId
    ) {

        List<Submission> submissions =
                submissionRepository
                        .findByContestId(
                                contestId
                        );

        Map<String, Set<Long>>
                solvedProblems =
                new HashMap<>();

        Map<String, Long>
                runtimes =
                new HashMap<>();

        for (
                Submission submission :
                submissions
        ) {

            if (
                    !"ACCEPTED".equals(
                            submission.getStatus()
                    )
            ) {

                continue;
            }

            String username =
                    submission
                            .getUser()
                            .getUsername();

            solvedProblems
                    .computeIfAbsent(
                            username,
                            k ->
                                    new HashSet<>()
                    )
                    .add(
                            submission
                                    .getProblem()
                                    .getId()
                    );

            runtimes.put(
                    username,
                    runtimes.getOrDefault(
                            username,
                            0L
                    )
                    +
                    (
                            submission.getRuntime()
                                    == null
                                    ? 0L
                                    : submission.getRuntime()
                    )
            );
        }

        List<ContestLeaderboardEntry>
                leaderboard =
                new ArrayList<>();

        for (
                String username :
                solvedProblems.keySet()
        ) {

            ContestLeaderboardEntry entry =
                    new ContestLeaderboardEntry();

            entry.setUsername(
                    username
            );

            entry.setSolvedProblems(
                    (long)
                    solvedProblems
                            .get(username)
                            .size()
            );

            entry.setTotalRuntime(
                    runtimes.get(
                            username
                    )
            );

            leaderboard.add(
                    entry
            );
        }

        leaderboard.sort(
                Comparator
                        .comparing(
                                ContestLeaderboardEntry::getSolvedProblems
                        )
                        .reversed()
                        .thenComparing(
                                ContestLeaderboardEntry::getTotalRuntime
                        )
        );

        return leaderboard;
    }
}
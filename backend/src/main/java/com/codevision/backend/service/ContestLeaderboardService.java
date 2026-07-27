package com.codevision.backend.service;

import com.codevision.backend.dto.ContestLeaderboardEntry;
import com.codevision.backend.entity.Submission;
import com.codevision.backend.repository.ContestRepository;
import com.codevision.backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ContestLeaderboardService {

    private final SubmissionRepository
            submissionRepository;

    private final ContestRepository contestRepository;

    public ContestLeaderboardService(
            SubmissionRepository submissionRepository,
            ContestRepository contestRepository
    ) {

        this.submissionRepository =
                submissionRepository;

        this.contestRepository =
                contestRepository;
    }

    public List<ContestLeaderboardEntry>
    getLeaderboard(
            Long contestId
    ) {
        if (!contestRepository.existsById(contestId)) {
            throw new NoSuchElementException("Contest not found");
        }

        List<Submission> submissions =
                submissionRepository
                        .findByContestId(
                                contestId
                        );

        Map<Long, String> usernames = new HashMap<>();
        Map<Long, Map<Long, Long>> bestRuntimeByProblem = new HashMap<>();

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

            Long userId = submission.getUser().getId();
            Long problemId = submission.getProblem().getId();
            long runtime = submission.getRuntime() == null ? 0L : submission.getRuntime();

            usernames.put(userId, submission.getUser().getUsername());
            bestRuntimeByProblem
                    .computeIfAbsent(userId, ignored -> new HashMap<>())
                    .merge(problemId, runtime, Math::min);
        }

        List<ContestLeaderboardEntry>
                leaderboard =
                new ArrayList<>();

        for (
                Long userId :
                bestRuntimeByProblem.keySet()
        ) {

            ContestLeaderboardEntry entry =
                    new ContestLeaderboardEntry();

            entry.setUsername(
                    usernames.get(userId)
            );

            entry.setSolvedProblems(
                    (long) bestRuntimeByProblem.get(userId).size()
            );

            entry.setTotalRuntime(
                    bestRuntimeByProblem.get(userId)
                            .values()
                            .stream()
                            .mapToLong(Long::longValue)
                            .sum()
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

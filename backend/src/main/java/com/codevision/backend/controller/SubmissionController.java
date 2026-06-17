package com.codevision.backend.controller;

import com.codevision.backend.dto.CreateSubmissionRequest;
import com.codevision.backend.dto.LeaderboardEntryResponse;
import com.codevision.backend.dto.SubmissionResponse;
import com.codevision.backend.service.LeaderboardService;
import com.codevision.backend.service.SubmissionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    private final LeaderboardService leaderboardService;

    public SubmissionController(
            SubmissionService submissionService,
            LeaderboardService leaderboardService
    ) {

        this.submissionService =
                submissionService;

        this.leaderboardService =
                leaderboardService;
    }

    @PostMapping
    public SubmissionResponse createSubmission(
            @RequestBody
            CreateSubmissionRequest request
    ) {

        return submissionService.createSubmission(
                request
        );
    }

    @GetMapping
    public List<SubmissionResponse> getAllSubmissions() {

        return submissionService.getAllSubmissions();
    }

    @GetMapping("/{id}")
    public SubmissionResponse getSubmissionById(
            @PathVariable Long id
    ) {

        return submissionService.getSubmissionById(
                id
        );
    }

    @GetMapping("/user/{userId}")
    public List<SubmissionResponse> getUserSubmissions(
            @PathVariable Long userId
    ) {

        return submissionService.getUserSubmissions(
                userId
        );
    }

    @GetMapping("/leaderboard/problem/{problemId}")
    public List<LeaderboardEntryResponse>
    getLeaderboard(
            @PathVariable Long problemId
    ) {

        return leaderboardService
                .getLeaderboard(
                        problemId
                );
    }
}
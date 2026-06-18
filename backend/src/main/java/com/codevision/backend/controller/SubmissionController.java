package com.codevision.backend.controller;

import com.codevision.backend.dto.CreateSubmissionRequest;
import com.codevision.backend.dto.LeaderboardEntryResponse;
import com.codevision.backend.dto.SubmissionResponse;
import com.codevision.backend.service.LeaderboardService;
import com.codevision.backend.service.SubmissionService;
import org.springframework.security.core.Authentication;
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
            CreateSubmissionRequest request,
            Authentication authentication
    ) {

        return submissionService.createSubmission(
                request,
                authentication.getName()
        );
    }

    @GetMapping
    public List<SubmissionResponse> getAllSubmissions() {

        return submissionService.getAllSubmissions();
    }

    @GetMapping("/me")
    public List<SubmissionResponse> getMySubmissions(
            Authentication authentication
    ) {

        return submissionService.getMySubmissions(
                authentication.getName()
        );
    }

    @GetMapping("/me/problem/{problemId}")
    public List<SubmissionResponse>
    getMySubmissionsForProblem(
            @PathVariable Long problemId,
            Authentication authentication
    ) {

        return submissionService
                .getMySubmissionsForProblem(
                        problemId,
                        authentication.getName()
                );
    }

    @GetMapping("/{id}")
    public SubmissionResponse getSubmissionById(
            @PathVariable Long id,
            Authentication authentication
    ) {

        return submissionService.getSubmissionById(
                id,
                authentication.getName()
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
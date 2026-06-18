package com.codevision.backend.controller;

import com.codevision.backend.dto.ContestLeaderboardEntry;
import com.codevision.backend.dto.ContestResponse;
import com.codevision.backend.entity.Contest;
import com.codevision.backend.service.ContestLeaderboardService;
import com.codevision.backend.service.ContestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contests")
public class ContestController {

    private final ContestService contestService;

    private final ContestLeaderboardService
            contestLeaderboardService;

    public ContestController(
            ContestService contestService,
            ContestLeaderboardService contestLeaderboardService
    ) {

        this.contestService =
                contestService;

        this.contestLeaderboardService =
                contestLeaderboardService;
    }

    @PostMapping
    public Contest createContest(
            @RequestBody Contest contest
    ) {

        return contestService.createContest(
                contest
        );
    }

    @GetMapping
    public List<Contest> getAllContests() {

        return contestService.getAllContests();
    }

    @GetMapping("/{id}")
    public ContestResponse getContestById(
            @PathVariable Long id
    ) {

        return contestService.getContestById(
                id
        );
    }

    @GetMapping(
            "/{contestId}/leaderboard"
    )
    public List<ContestLeaderboardEntry>
    getLeaderboard(
            @PathVariable Long contestId
    ) {

        return contestLeaderboardService
                .getLeaderboard(
                        contestId
                );
    }

    @PostMapping(
            "/{contestId}/problems/{problemId}"
    )
    public Contest addProblemToContest(
            @PathVariable Long contestId,
            @PathVariable Long problemId
    ) {

        return contestService
                .addProblemToContest(
                        contestId,
                        problemId
                );
    }

    @PutMapping("/{id}")
    public Contest updateContest(
            @PathVariable Long id,
            @RequestBody Contest contest
    ) {

        return contestService.updateContest(
                id,
                contest
        );
    }

    @DeleteMapping("/{id}")
    public void deleteContest(
            @PathVariable Long id
    ) {

        contestService.deleteContest(
                id
        );
    }
}
package com.codevision.backend.service;

import com.codevision.backend.dto.ContestResponse;
import com.codevision.backend.entity.Contest;
import com.codevision.backend.entity.Problem;
import com.codevision.backend.repository.ContestRepository;
import com.codevision.backend.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ContestService {

    private final ContestRepository contestRepository;

    private final ProblemRepository problemRepository;

    public ContestService(
            ContestRepository contestRepository,
            ProblemRepository problemRepository
    ) {

        this.contestRepository =
                contestRepository;

        this.problemRepository =
                problemRepository;
    }

    public Contest createContest(
            Contest contest
    ) {

        return contestRepository.save(
                contest
        );
    }

    public List<Contest> getAllContests() {

        return contestRepository.findAll();
    }

    public ContestResponse getContestById(
            Long id
    ) {

        Contest contest =
                contestRepository
                        .findById(id)
                        .orElse(null);

        if (
                contest == null
        ) {

            return null;
        }

        return convertToResponse(
                contest
        );
    }

    public Contest updateContest(
            Long id,
            Contest updatedContest
    ) {

        Contest contest =
                contestRepository
                        .findById(id)
                        .orElseThrow();

        contest.setTitle(
                updatedContest.getTitle()
        );

        contest.setDescription(
                updatedContest.getDescription()
        );

        contest.setStartTime(
                updatedContest.getStartTime()
        );

        contest.setEndTime(
                updatedContest.getEndTime()
        );

        contest.setProblems(
                updatedContest.getProblems()
        );

        return contestRepository.save(
                contest
        );
    }

    public Contest addProblemToContest(
            Long contestId,
            Long problemId
    ) {

        Contest contest =
                contestRepository
                        .findById(
                                contestId
                        )
                        .orElseThrow();

        Problem problem =
                problemRepository
                        .findById(
                                problemId
                        )
                        .orElseThrow();

        if (
                contest.getProblems()
                        == null
        ) {

            contest.setProblems(
                    new ArrayList<>()
            );
        }

        contest.getProblems().add(
                problem
        );

        return contestRepository.save(
                contest
        );
    }

    public void deleteContest(
            Long id
    ) {

        contestRepository.deleteById(
                id
        );
    }

    private ContestResponse convertToResponse(
            Contest contest
    ) {

        ContestResponse response =
                new ContestResponse();

        response.setId(
                contest.getId()
        );

        response.setTitle(
                contest.getTitle()
        );

        response.setDescription(
                contest.getDescription()
        );

        response.setStartTime(
                contest.getStartTime()
        );

        response.setEndTime(
                contest.getEndTime()
        );

        response.setProblems(
                contest.getProblems()
        );

        LocalDateTime now =
                LocalDateTime.now();

        if (
                now.isBefore(
                        contest.getStartTime()
                )
        ) {

            response.setStatus(
                    "UPCOMING"
            );
        }

        else if (
                now.isAfter(
                        contest.getEndTime()
                )
        ) {

            response.setStatus(
                    "ENDED"
            );
        }

        else {

            response.setStatus(
                    "ACTIVE"
            );
        }

        return response;
    }
}
package com.codevision.backend.service;

import com.codevision.backend.dto.ContestResponse;
import com.codevision.backend.entity.Contest;
import com.codevision.backend.entity.Problem;
import com.codevision.backend.repository.ContestRepository;
import com.codevision.backend.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

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
        validateSchedule(contest);
        contest.setId(null);
        contest.setProblems(resolveProblems(contest.getProblems()));
        return contestRepository.save(
                contest
        );
    }

    public List<ContestResponse> getAllContests() {

        return contestRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public ContestResponse getContestById(
            Long id
    ) {

        Contest contest =
                contestRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new NoSuchElementException("Contest not found")
                        );

        return convertToResponse(
                contest
        );
    }

    public Contest updateContest(
            Long id,
            Contest updatedContest
    ) {
        validateSchedule(updatedContest);

        Contest contest =
                contestRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new NoSuchElementException("Contest not found")
                        );

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
                resolveProblems(updatedContest.getProblems())
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
                        .orElseThrow(
                                () -> new NoSuchElementException("Contest not found")
                        );

        Problem problem =
                problemRepository
                        .findById(
                                problemId
                        )
                        .orElseThrow(
                                () -> new NoSuchElementException("Problem not found")
                        );

        if (
                contest.getProblems()
                        == null
        ) {

            contest.setProblems(
                    new ArrayList<>()
            );
        }

        boolean alreadyAssigned = contest.getProblems()
                .stream()
                .anyMatch(existingProblem -> existingProblem.getId().equals(problemId));

        if (!alreadyAssigned) {
            contest.getProblems().add(problem);
        }

        return contestRepository.save(contest);
    }

    public void deleteContest(
            Long id
    ) {
        if (!contestRepository.existsById(id)) {
            throw new NoSuchElementException("Contest not found");
        }

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

        if (contest.getStartTime() == null || contest.getEndTime() == null) {
            response.setStatus("UNSCHEDULED");
            return response;
        }

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

    private void validateSchedule(
            Contest contest
    ) {
        if (contest.getStartTime() == null || contest.getEndTime() == null) {
            throw new IllegalArgumentException("Contest start and end times are required");
        }
        if (!contest.getEndTime().isAfter(contest.getStartTime())) {
            throw new IllegalArgumentException("Contest end time must be after its start time");
        }
    }

    private List<Problem> resolveProblems(
            List<Problem> problems
    ) {
        if (problems == null || problems.isEmpty()) {
            return new ArrayList<>();
        }

        Map<Long, Problem> resolvedProblems = new LinkedHashMap<>();

        for (Problem problem : problems) {
            if (problem == null || problem.getId() == null) {
                throw new IllegalArgumentException("Contest problems must reference existing problem IDs");
            }

            resolvedProblems.computeIfAbsent(
                    problem.getId(),
                    problemId -> problemRepository.findById(problemId)
                            .orElseThrow(() -> new NoSuchElementException("Problem not found"))
            );
        }

        return new ArrayList<>(resolvedProblems.values());
    }
}

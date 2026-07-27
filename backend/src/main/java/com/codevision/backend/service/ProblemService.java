package com.codevision.backend.service;

import com.codevision.backend.entity.Problem;
import com.codevision.backend.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    public ProblemService(
            ProblemRepository problemRepository
    ) {
        this.problemRepository = problemRepository;
    }

    public Problem createProblem(
            Problem problem
    ) {
        problem.setId(null);
        problem.setDifficulty(normalizeDifficulty(problem.getDifficulty()));

        return problemRepository.save(
                problem
        );
    }

    public List<Problem> getAllProblems() {

        return problemRepository.findAll();
    }

    public Problem getProblemById(
            Long id
    ) {

        return problemRepository
                .findById(id)
                .orElseThrow(
                        () -> new NoSuchElementException("Problem not found")
                );
    }

    public Problem updateProblem(
            Long id,
            Problem updatedProblem
    ) {

        Problem existingProblem =
                problemRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new NoSuchElementException("Problem not found")
                        );

        existingProblem.setTitle(
                updatedProblem.getTitle()
        );

        existingProblem.setDescription(
                updatedProblem.getDescription()
        );

        existingProblem.setDifficulty(
                normalizeDifficulty(updatedProblem.getDifficulty())
        );

        existingProblem.setSampleInput(
                updatedProblem.getSampleInput()
        );

        existingProblem.setSampleOutput(
                updatedProblem.getSampleOutput()
        );

        return problemRepository.save(
                existingProblem
        );
    }

    public void deleteProblem(
            Long id
    ) {
        if (!problemRepository.existsById(id)) {
            throw new NoSuchElementException("Problem not found");
        }

        problemRepository.deleteById(
                id
        );
    }

    private String normalizeDifficulty(
            String difficulty
    ) {
        return difficulty.substring(0, 1).toUpperCase()
                + difficulty.substring(1).toLowerCase();
    }
}

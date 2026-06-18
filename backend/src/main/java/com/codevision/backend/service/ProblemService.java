package com.codevision.backend.service;

import com.codevision.backend.entity.Problem;
import com.codevision.backend.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
                .orElse(null);
    }

    public Problem updateProblem(
            Long id,
            Problem updatedProblem
    ) {

        Problem existingProblem =
                problemRepository
                        .findById(id)
                        .orElseThrow();

        existingProblem.setTitle(
                updatedProblem.getTitle()
        );

        existingProblem.setDescription(
                updatedProblem.getDescription()
        );

        existingProblem.setDifficulty(
                updatedProblem.getDifficulty()
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

        problemRepository.deleteById(
                id
        );
    }
}
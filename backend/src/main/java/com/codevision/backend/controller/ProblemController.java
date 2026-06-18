package com.codevision.backend.controller;

import com.codevision.backend.entity.Problem;
import com.codevision.backend.service.ProblemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/problems")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(
            ProblemService problemService
    ) {
        this.problemService =
                problemService;
    }

    @PostMapping
    public Problem createProblem(
            @RequestBody Problem problem
    ) {

        return problemService.createProblem(
                problem
        );
    }

    @GetMapping
    public List<Problem> getAllProblems() {

        return problemService.getAllProblems();
    }

    @GetMapping("/{id}")
    public Problem getProblemById(
            @PathVariable Long id
    ) {

        return problemService.getProblemById(
                id
        );
    }

    @PutMapping("/{id}")
    public Problem updateProblem(
            @PathVariable Long id,
            @RequestBody Problem problem
    ) {

        return problemService.updateProblem(
                id,
                problem
        );
    }

    @DeleteMapping("/{id}")
    public void deleteProblem(
            @PathVariable Long id
    ) {

        problemService.deleteProblem(
                id
        );
    }
}
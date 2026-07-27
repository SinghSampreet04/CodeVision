package com.codevision.backend.controller;

import com.codevision.backend.entity.Problem;
import com.codevision.backend.service.ProblemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
    public Problem createProblem(
            @Valid @RequestBody Problem problem
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
            @Valid @RequestBody Problem problem
    ) {

        return problemService.updateProblem(
                id,
                problem
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProblem(
            @PathVariable Long id
    ) {

        problemService.deleteProblem(
                id
        );
    }
}

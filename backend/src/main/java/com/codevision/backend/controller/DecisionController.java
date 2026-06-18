package com.codevision.backend.controller;

import com.codevision.backend.service.DecisionResult;
import com.codevision.backend.service.DecisionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/decision")
public class DecisionController {

    private final DecisionService decisionService;

    public DecisionController(
            DecisionService decisionService
    ) {

        this.decisionService =
                decisionService;
    }

    @PostMapping("/{problemId}")
    public DecisionResult evaluate(
            @PathVariable Long problemId,
            @RequestBody String code
    ) {

        return decisionService
                .evaluateSubmission(
                        code,
                        "java",
                        problemId
                );
    }
}
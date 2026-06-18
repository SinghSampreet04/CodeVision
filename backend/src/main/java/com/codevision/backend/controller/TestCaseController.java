package com.codevision.backend.controller;

import com.codevision.backend.entity.TestCase;
import com.codevision.backend.service.TestCaseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/testcases")
public class TestCaseController {

    private final TestCaseService
            testCaseService;

    public TestCaseController(
            TestCaseService testCaseService
    ) {

        this.testCaseService =
                testCaseService;
    }

    @PostMapping
    public TestCase createTestCase(
            @RequestBody TestCase testCase
    ) {

        return testCaseService
                .createTestCase(
                        testCase
                );
    }

    @GetMapping("/problem/{problemId}")
    public List<TestCase> getByProblemId(
            @PathVariable Long problemId
    ) {

        return testCaseService
                .getByProblemId(
                        problemId
                );
    }

    @DeleteMapping("/{id}")
    public void deleteTestCase(
            @PathVariable Long id
    ) {

        testCaseService.deleteTestCase(
                id
        );
    }
}
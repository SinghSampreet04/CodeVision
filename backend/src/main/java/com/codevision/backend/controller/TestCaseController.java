package com.codevision.backend.controller;

import com.codevision.backend.dto.UpdateTestCaseRequest;
import com.codevision.backend.entity.TestCase;
import com.codevision.backend.service.TestCaseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
    public TestCase createTestCase(
            @Valid @RequestBody TestCase testCase
    ) {

        return testCaseService
                .createTestCase(
                        testCase
                );
    }

    @PutMapping("/{id}")
    public TestCase updateTestCase(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTestCaseRequest request
    ) {

        return testCaseService
                .updateTestCase(
                        id,
                        request
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
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTestCase(
            @PathVariable Long id
    ) {

        testCaseService.deleteTestCase(
                id
        );
    }
}

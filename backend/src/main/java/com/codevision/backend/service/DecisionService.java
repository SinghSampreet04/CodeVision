package com.codevision.backend.service;

import com.codevision.backend.entity.TestCase;
import com.codevision.backend.repository.TestCaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DecisionService {

    private final TestCaseRepository testCaseRepository;

    private final DockerExecutionService dockerExecutionService;

    public DecisionService(
            TestCaseRepository testCaseRepository,
            DockerExecutionService dockerExecutionService
    ) {
        this.testCaseRepository =
                testCaseRepository;

        this.dockerExecutionService =
                dockerExecutionService;
    }

    public DecisionResult evaluateSubmission(
            String code,
            Long problemId
    ) {

        DecisionResult result =
                new DecisionResult();

        List<TestCase> testCases =
                testCaseRepository.findByProblemId(
                        problemId
                );

        int passed = 0;

        long totalRuntime = 0;

        for (TestCase testCase : testCases) {

            ExecutionResult executionResult =
                    dockerExecutionService
                            .executeJavaCode(
                                    code,
                                    testCase.getInput()
                            );

            String actualOutput =
                    executionResult.getOutput();

            totalRuntime +=
                    executionResult.getRuntime();

            if (
                    actualOutput.equals(
                            "COMPILATION_ERROR"
                    )
            ) {

                result.setStatus(
                        "COMPILATION_ERROR"
                );

                result.setPassed(0);

                result.setTotal(
                        testCases.size()
                );

                result.setRuntime(
                        totalRuntime
                );

                return result;
            }

            if (
                    actualOutput.equals(
                            "RUNTIME_ERROR"
                    )
            ) {

                result.setStatus(
                        "RUNTIME_ERROR"
                );

                result.setPassed(
                        passed
                );

                result.setTotal(
                        testCases.size()
                );

                result.setRuntime(
                        totalRuntime
                );

                return result;
            }

            if (
                    actualOutput.equals(
                            "TIME_LIMIT_EXCEEDED"
                    )
            ) {

                result.setStatus(
                        "TIME_LIMIT_EXCEEDED"
                );

                result.setPassed(
                        passed
                );

                result.setTotal(
                        testCases.size()
                );

                result.setRuntime(
                        totalRuntime
                );

                return result;
            }

            String expectedOutput =
                    testCase
                            .getExpectedOutput()
                            .trim();

            if (
                    actualOutput.trim().equals(
                            expectedOutput
                    )
            ) {

                passed++;
            }
        }

        result.setPassed(
                passed
        );

        result.setTotal(
                testCases.size()
        );

        result.setRuntime(
                totalRuntime
        );

        if (
                passed ==
                testCases.size()
        ) {

            result.setStatus(
                    "ACCEPTED"
            );
        } else {

            result.setStatus(
                    "WRONG_ANSWER"
            );
        }

        return result;
    }
}
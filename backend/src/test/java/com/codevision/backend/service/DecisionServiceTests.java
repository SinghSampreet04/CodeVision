package com.codevision.backend.service;

import com.codevision.backend.entity.TestCase;
import com.codevision.backend.repository.TestCaseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DecisionServiceTests {

    @Mock
    private TestCaseRepository testCaseRepository;

    @Mock
    private DockerExecutionService dockerExecutionService;

    private DecisionService decisionService;

    @BeforeEach
    void setUp() {
        decisionService = new DecisionService(
                testCaseRepository,
                dockerExecutionService
        );
    }

    @Test
    void treatsStatusLikeProgramOutputAsNormalOutput() {
        TestCase testCase = testCase("", "RUNTIME_ERROR");
        when(testCaseRepository.findByProblemId(1L)).thenReturn(List.of(testCase));
        when(dockerExecutionService.executeCode("solution", "", "python"))
                .thenReturn(executionResult("SUCCESS", "RUNTIME_ERROR", 7L));

        DecisionResult result = decisionService.evaluateSubmission(
                "solution",
                "python",
                1L
        );

        assertEquals("ACCEPTED", result.getStatus());
        assertEquals(1, result.getPassed());
        assertEquals(1, result.getTotal());
        assertEquals(7L, result.getRuntime());
    }

    @Test
    void propagatesExecutionFailuresWithoutComparingOutputText() {
        TestCase testCase = testCase("", "expected");
        when(testCaseRepository.findByProblemId(1L)).thenReturn(List.of(testCase));
        when(dockerExecutionService.executeCode("broken", "", "java"))
                .thenReturn(executionResult("COMPILATION_ERROR", "compiler details", 12L));

        DecisionResult result = decisionService.evaluateSubmission(
                "broken",
                "java",
                1L
        );

        assertEquals("COMPILATION_ERROR", result.getStatus());
        assertEquals(0, result.getPassed());
        assertEquals(1, result.getTotal());
        assertEquals(12L, result.getRuntime());
    }

    private TestCase testCase(
            String input,
            String expectedOutput
    ) {
        TestCase testCase = new TestCase();
        testCase.setInput(input);
        testCase.setExpectedOutput(expectedOutput);
        return testCase;
    }

    private ExecutionResult executionResult(
            String status,
            String output,
            long runtime
    ) {
        ExecutionResult result = new ExecutionResult();
        result.setStatus(status);
        result.setOutput(output);
        result.setRuntime(runtime);
        return result;
    }
}

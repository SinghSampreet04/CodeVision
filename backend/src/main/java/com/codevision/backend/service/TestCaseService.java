package com.codevision.backend.service;

import com.codevision.backend.dto.UpdateTestCaseRequest;
import com.codevision.backend.entity.TestCase;
import com.codevision.backend.repository.ProblemRepository;
import com.codevision.backend.repository.TestCaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TestCaseService {

    private final TestCaseRepository
            testCaseRepository;
    private final ProblemRepository
            problemRepository;

    public TestCaseService(
            TestCaseRepository testCaseRepository,
            ProblemRepository problemRepository
    ) {

        this.testCaseRepository =
                testCaseRepository;

        this.problemRepository =
                problemRepository;
    }

    public TestCase createTestCase(
            TestCase testCase
    ) {
        if (testCase.getProblem() == null || testCase.getProblem().getId() == null) {
            throw new IllegalArgumentException("Test case must reference an existing problem");
        }

        testCase.setProblem(
                problemRepository
                        .findById(testCase.getProblem().getId())
                        .orElseThrow(
                                () -> new NoSuchElementException("Problem not found")
                        )
        );

        testCase.setId(null);

        if (testCase.getHidden() == null) {
            testCase.setHidden(false);
        }

        return testCaseRepository.save(
                testCase
        );
    }

    public List<TestCase> getByProblemId(
            Long problemId
    ) {
        if (!problemRepository.existsById(problemId)) {
            throw new NoSuchElementException("Problem not found");
        }

        return testCaseRepository
                .findByProblemId(
                        problemId
                );
    }

    public TestCase updateTestCase(
            Long id,
            UpdateTestCaseRequest request
    ) {

        TestCase existingTestCase =
                testCaseRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new NoSuchElementException("Test case not found")
                        );

        existingTestCase.setInput(
                request.getInput()
        );

        existingTestCase.setExpectedOutput(
                request.getExpectedOutput()
        );

        existingTestCase.setHidden(request.getHidden());

        return testCaseRepository.save(
                existingTestCase
        );
    }

    public void deleteTestCase(
            Long id
    ) {
        if (!testCaseRepository.existsById(id)) {
            throw new NoSuchElementException("Test case not found");
        }

        testCaseRepository.deleteById(
                id
        );
    }
}

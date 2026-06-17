package com.codevision.backend.service;

import com.codevision.backend.entity.TestCase;
import com.codevision.backend.repository.TestCaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestCaseService {

    private final TestCaseRepository testCaseRepository;

    public TestCaseService(
            TestCaseRepository testCaseRepository
    ) {
        this.testCaseRepository = testCaseRepository;
    }

    public TestCase createTestCase(
            TestCase testCase
    ) {
        return testCaseRepository.save(
                testCase
        );
    }

    public List<TestCase> getByProblemId(
            Long problemId
    ) {
        return testCaseRepository.findByProblemId(
                problemId
        );
    }
}
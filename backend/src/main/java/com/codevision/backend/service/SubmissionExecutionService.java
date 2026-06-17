package com.codevision.backend.service;

import com.codevision.backend.entity.Submission;
import com.codevision.backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

@Service
public class SubmissionExecutionService {

    private final SubmissionRepository submissionRepository;
    private final DecisionService decisionService;

    public SubmissionExecutionService(
            SubmissionRepository submissionRepository,
            DecisionService decisionService
    ) {
        this.submissionRepository =
                submissionRepository;

        this.decisionService =
                decisionService;
    }

    public Submission executeSubmission(
            Submission submission
    ) {

        DecisionResult decisionResult =
                decisionService.evaluateSubmission(
                        submission.getCode(),
                        submission.getProblem().getId()
                );

        submission.setStatus(
                decisionResult.getStatus()
        );

        submission.setPassedTestCases(
                decisionResult.getPassed()
        );

        submission.setTotalTestCases(
                decisionResult.getTotal()
        );

        return submissionRepository.save(
                submission
        );
    }
}
package com.codevision.backend.service;

import com.codevision.backend.entity.Submission;
import com.codevision.backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

@Service
public class SubmissionExecutionService {

    private final SubmissionRepository
            submissionRepository;

    private final DecisionService
            decisionService;

    private final AIReviewService
            aiReviewService;

    public SubmissionExecutionService(
            SubmissionRepository submissionRepository,
            DecisionService decisionService,
            AIReviewService aiReviewService
    ) {

        this.submissionRepository =
                submissionRepository;

        this.decisionService =
                decisionService;

        this.aiReviewService =
                aiReviewService;
    }

    public Submission executeSubmission(
            Submission submission
    ) {

        DecisionResult decisionResult =
               decisionService
        .evaluateSubmission(
                submission.getCode(),
                submission.getLanguage(),
                submission
                        .getProblem()
                        .getId()
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

        submission.setRuntime(
                decisionResult.getRuntime()
        );

        String feedback =
                aiReviewService
                        .generateFeedback(
                                submission.getCode(),
                                decisionResult.getStatus()
                        );

        submission.setFeedback(
                feedback
        );

        return submissionRepository.save(
                submission
        );
    }
}
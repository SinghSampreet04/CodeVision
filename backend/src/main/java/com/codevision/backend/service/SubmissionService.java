package com.codevision.backend.service;

import com.codevision.backend.dto.CreateSubmissionRequest;
import com.codevision.backend.dto.SubmissionResponse;
import com.codevision.backend.entity.Problem;
import com.codevision.backend.entity.Submission;
import com.codevision.backend.entity.User;
import com.codevision.backend.repository.ProblemRepository;
import com.codevision.backend.repository.SubmissionRepository;
import com.codevision.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;

    private final UserRepository userRepository;

    private final ProblemRepository problemRepository;

    private final SubmissionExecutionService
            submissionExecutionService;

    public SubmissionService(
            SubmissionRepository submissionRepository,
            UserRepository userRepository,
            ProblemRepository problemRepository,
            SubmissionExecutionService submissionExecutionService
    ) {

        this.submissionRepository =
                submissionRepository;

        this.userRepository =
                userRepository;

        this.problemRepository =
                problemRepository;

        this.submissionExecutionService =
                submissionExecutionService;
    }

    public SubmissionResponse createSubmission(
            CreateSubmissionRequest request
    ) {

        User user =
                userRepository.findById(
                        request.getUserId()
                ).orElseThrow();

        Problem problem =
                problemRepository.findById(
                        request.getProblemId()
                ).orElseThrow();

        Submission submission =
                new Submission();

        submission.setUser(user);

        submission.setProblem(problem);

        submission.setLanguage(
                request.getLanguage()
        );

        submission.setCode(
                request.getCode()
        );

        submission.setStatus(
                "PENDING"
        );

        Submission savedSubmission =
                submissionRepository.save(
                        submission
                );

        Submission evaluatedSubmission =
                submissionExecutionService
                        .executeSubmission(
                                savedSubmission
                        );

        return convertToResponse(
                evaluatedSubmission
        );
    }

    public List<SubmissionResponse>
    getAllSubmissions() {

        return submissionRepository
                .findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public SubmissionResponse
    getSubmissionById(
            Long id
    ) {

        Submission submission =
                submissionRepository
                        .findById(id)
                        .orElse(null);

        if (
                submission == null
        ) {

            return null;
        }

        return convertToResponse(
                submission
        );
    }

    public List<SubmissionResponse>
    getUserSubmissions(
            Long userId
    ) {

        return submissionRepository
                .findByUserId(userId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private SubmissionResponse
    convertToResponse(
            Submission submission
    ) {

        SubmissionResponse response =
                new SubmissionResponse();

        response.setId(
                submission.getId()
        );

        response.setStatus(
                submission.getStatus()
        );

        response.setPassedTestCases(
                submission.getPassedTestCases()
        );

        response.setTotalTestCases(
                submission.getTotalTestCases()
        );

        response.setLanguage(
                submission.getLanguage()
        );

        response.setCode(
                submission.getCode()
        );

        response.setFeedback(
                submission.getFeedback()
        );

        response.setRuntime(
                submission.getRuntime()
        );

        response.setCreatedAt(
                submission.getCreatedAt()
        );

        return response;
    }
}
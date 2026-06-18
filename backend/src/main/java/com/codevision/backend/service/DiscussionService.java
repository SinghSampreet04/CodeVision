package com.codevision.backend.service;

import com.codevision.backend.dto.CreateDiscussionRequest;
import com.codevision.backend.dto.DiscussionResponse;
import com.codevision.backend.entity.Discussion;
import com.codevision.backend.entity.Problem;
import com.codevision.backend.entity.User;
import com.codevision.backend.repository.DiscussionRepository;
import com.codevision.backend.repository.ProblemRepository;
import com.codevision.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscussionService {

    private final DiscussionRepository discussionRepository;

    private final UserRepository userRepository;

    private final ProblemRepository problemRepository;

    public DiscussionService(
            DiscussionRepository discussionRepository,
            UserRepository userRepository,
            ProblemRepository problemRepository
    ) {

        this.discussionRepository =
                discussionRepository;

        this.userRepository =
                userRepository;

        this.problemRepository =
                problemRepository;
    }

    public DiscussionResponse createDiscussion(
            CreateDiscussionRequest request,
            String email
    ) {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow();

        Problem problem =
                problemRepository
                        .findById(
                                request.getProblemId()
                        )
                        .orElseThrow();

        Discussion discussion =
                new Discussion();

        discussion.setUser(
                user
        );

        discussion.setProblem(
                problem
        );

        discussion.setContent(
                request.getContent()
        );

        Discussion saved =
                discussionRepository.save(
                        discussion
                );

        return convertToResponse(
                saved
        );
    }

    public List<DiscussionResponse>
    getProblemDiscussions(
            Long problemId
    ) {

        return discussionRepository
                .findByProblemIdOrderByCreatedAtDesc(
                        problemId
                )
                .stream()
                .map(
                        this::convertToResponse
                )
                .toList();
    }

    private DiscussionResponse
    convertToResponse(
            Discussion discussion
    ) {

        DiscussionResponse response =
                new DiscussionResponse();

        response.setId(
                discussion.getId()
        );

        response.setUsername(
                discussion
                        .getUser()
                        .getUsername()
        );

        response.setContent(
                discussion.getContent()
        );

        response.setCreatedAt(
                discussion.getCreatedAt()
        );

        return response;
    }
}
package com.codevision.backend.controller;

import com.codevision.backend.dto.CreateDiscussionRequest;
import com.codevision.backend.dto.DiscussionResponse;
import com.codevision.backend.service.DiscussionService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/discussions")
public class DiscussionController {

    private final DiscussionService
            discussionService;

    public DiscussionController(
            DiscussionService discussionService
    ) {

        this.discussionService =
                discussionService;
    }

    @PostMapping
    public DiscussionResponse
    createDiscussion(
            @RequestBody
            CreateDiscussionRequest request,
            Authentication authentication
    ) {

        return discussionService
                .createDiscussion(
                        request,
                        authentication.getName()
                );
    }

    @GetMapping(
            "/problem/{problemId}"
    )
    public List<DiscussionResponse>
    getProblemDiscussions(
            @PathVariable Long problemId
    ) {

        return discussionService
                .getProblemDiscussions(
                        problemId
                );
    }
}
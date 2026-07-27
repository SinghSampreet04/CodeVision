package com.codevision.backend.controller;

import com.codevision.backend.dto.CreateDiscussionRequest;
import com.codevision.backend.dto.DiscussionResponse;
import com.codevision.backend.service.DiscussionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
    public DiscussionResponse
    createDiscussion(
            @RequestBody
            @Valid
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

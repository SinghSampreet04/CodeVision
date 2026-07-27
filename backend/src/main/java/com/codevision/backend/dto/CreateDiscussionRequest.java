package com.codevision.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class CreateDiscussionRequest {

    @NotNull
    @Positive
    private Long problemId;

    @NotBlank
    @Size(max = 2000)
    private String content;

    public CreateDiscussionRequest() {
    }

    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(
            Long problemId
    ) {
        this.problemId = problemId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(
            String content
    ) {
        this.content = content;
    }
}

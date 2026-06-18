package com.codevision.backend.dto;

public class CreateDiscussionRequest {

    private Long problemId;

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
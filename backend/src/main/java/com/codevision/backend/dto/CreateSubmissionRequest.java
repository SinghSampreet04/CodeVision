package com.codevision.backend.dto;

public class CreateSubmissionRequest {

    private Long problemId;

    private String language;

    private String code;

    public CreateSubmissionRequest() {
    }

    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(
            Long problemId
    ) {
        this.problemId = problemId;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(
            String language
    ) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(
            String code
    ) {
        this.code = code;
    }
}
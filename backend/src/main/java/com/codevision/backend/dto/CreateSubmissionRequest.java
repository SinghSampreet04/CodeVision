package com.codevision.backend.dto;

public class CreateSubmissionRequest {

    private Long problemId;

    private Long contestId;

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

    public Long getContestId() {
        return contestId;
    }

    public void setContestId(
            Long contestId
    ) {
        this.contestId = contestId;
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
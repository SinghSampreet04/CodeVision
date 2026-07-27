package com.codevision.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class CreateSubmissionRequest {

    @NotNull
    @Positive
    private Long problemId;

    @Positive
    private Long contestId;

    @NotBlank
    @Pattern(regexp = "(?i)java|python|javascript|cpp")
    private String language;

    @NotBlank
    @Size(max = 50000)
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

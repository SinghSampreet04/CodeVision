package com.codevision.backend.dto;

import java.time.LocalDateTime;

public class SubmissionResponse {

    private Long id;

    private String status;

    private Integer passedTestCases;

    private Integer totalTestCases;

    private String language;

    private String code;

    private LocalDateTime createdAt;

    public SubmissionResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status
    ) {
        this.status = status;
    }

    public Integer getPassedTestCases() {
        return passedTestCases;
    }

    public void setPassedTestCases(
            Integer passedTestCases
    ) {
        this.passedTestCases =
                passedTestCases;
    }

    public Integer getTotalTestCases() {
        return totalTestCases;
    }

    public void setTotalTestCases(
            Integer totalTestCases
    ) {
        this.totalTestCases =
                totalTestCases;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(
            String language
    ) {
        this.language =
                language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(
            String code
    ) {
        this.code =
                code;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt =
                createdAt;
    }
}
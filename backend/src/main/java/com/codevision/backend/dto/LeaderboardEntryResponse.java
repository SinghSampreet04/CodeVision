package com.codevision.backend.dto;

public class LeaderboardEntryResponse {

    private String username;

    private Long runtime;

    private Long submissionId;

    public LeaderboardEntryResponse() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(
            String username
    ) {
        this.username = username;
    }

    public Long getRuntime() {
        return runtime;
    }

    public void setRuntime(
            Long runtime
    ) {
        this.runtime = runtime;
    }

    public Long getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(
            Long submissionId
    ) {
        this.submissionId = submissionId;
    }
}
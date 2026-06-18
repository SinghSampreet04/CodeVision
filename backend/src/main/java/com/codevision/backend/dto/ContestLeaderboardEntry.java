package com.codevision.backend.dto;

public class ContestLeaderboardEntry {

    private String username;

    private Long solvedProblems;

    private Long totalRuntime;

    public ContestLeaderboardEntry() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(
            String username
    ) {
        this.username = username;
    }

    public Long getSolvedProblems() {
        return solvedProblems;
    }

    public void setSolvedProblems(
            Long solvedProblems
    ) {
        this.solvedProblems =
                solvedProblems;
    }

    public Long getTotalRuntime() {
        return totalRuntime;
    }

    public void setTotalRuntime(
            Long totalRuntime
    ) {
        this.totalRuntime =
                totalRuntime;
    }
}
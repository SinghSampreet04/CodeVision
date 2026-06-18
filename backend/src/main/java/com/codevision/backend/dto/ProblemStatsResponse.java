package com.codevision.backend.dto;

public class ProblemStatsResponse {

    private Long totalSubmissions;

    private Long acceptedSubmissions;

    private Long acceptedUsers;

    private Double acceptanceRate;

    public ProblemStatsResponse() {
    }

    public Long getTotalSubmissions() {
        return totalSubmissions;
    }

    public void setTotalSubmissions(
            Long totalSubmissions
    ) {
        this.totalSubmissions =
                totalSubmissions;
    }

    public Long getAcceptedSubmissions() {
        return acceptedSubmissions;
    }

    public void setAcceptedSubmissions(
            Long acceptedSubmissions
    ) {
        this.acceptedSubmissions =
                acceptedSubmissions;
    }

    public Long getAcceptedUsers() {
        return acceptedUsers;
    }

    public void setAcceptedUsers(
            Long acceptedUsers
    ) {
        this.acceptedUsers =
                acceptedUsers;
    }

    public Double getAcceptanceRate() {
        return acceptanceRate;
    }

    public void setAcceptanceRate(
            Double acceptanceRate
    ) {
        this.acceptanceRate =
                acceptanceRate;
    }
}
package com.codevision.backend.dto;

public class UserProfileResponse {

    private Long id;

    private String username;

    private String email;

    private String role;

    private Long totalSubmissions;

    private Long acceptedSubmissions;

    private Double acceptanceRate;

    private Long solvedProblems;

    private Long easySolved;

    private Long mediumSolved;

    private Long hardSolved;

    public UserProfileResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(
            String username
    ) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(
            String role
    ) {
        this.role = role;
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

    public Double getAcceptanceRate() {
        return acceptanceRate;
    }

    public void setAcceptanceRate(
            Double acceptanceRate
    ) {
        this.acceptanceRate =
                acceptanceRate;
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

    public Long getEasySolved() {
        return easySolved;
    }

    public void setEasySolved(
            Long easySolved
    ) {
        this.easySolved =
                easySolved;
    }

    public Long getMediumSolved() {
        return mediumSolved;
    }

    public void setMediumSolved(
            Long mediumSolved
    ) {
        this.mediumSolved =
                mediumSolved;
    }

    public Long getHardSolved() {
        return hardSolved;
    }

    public void setHardSolved(
            Long hardSolved
    ) {
        this.hardSolved =
                hardSolved;
    }
}
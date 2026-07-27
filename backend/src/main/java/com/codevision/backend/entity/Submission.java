package com.codevision.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @ManyToOne
    @JoinColumn(name = "contest_id")
    private Contest contest;

    @Column(nullable = false, length = 20)
    @NotBlank
    private String language;

    @Column(columnDefinition = "TEXT", nullable = false)
    @NotBlank
    @Size(max = 50000)
    private String code;

    @Column(nullable = false, length = 32)
    @NotBlank
    private String status;

    private Integer passedTestCases;

    private Integer totalTestCases;

    private Long runtime;

    private Long memory;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt =
            LocalDateTime.now();

    public Submission() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(
            User user
    ) {
        this.user = user;
    }

    public Problem getProblem() {
        return problem;
    }

    public void setProblem(
            Problem problem
    ) {
        this.problem = problem;
    }

    public Contest getContest() {
        return contest;
    }

    public void setContest(
            Contest contest
    ) {
        this.contest = contest;
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
        this.passedTestCases = passedTestCases;
    }

    public Integer getTotalTestCases() {
        return totalTestCases;
    }

    public void setTotalTestCases(
            Integer totalTestCases
    ) {
        this.totalTestCases = totalTestCases;
    }

    public Long getRuntime() {
        return runtime;
    }

    public void setRuntime(
            Long runtime
    ) {
        this.runtime = runtime;
    }

    public Long getMemory() {
        return memory;
    }

    public void setMemory(
            Long memory
    ) {
        this.memory = memory;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(
            String feedback
    ) {
        this.feedback = feedback;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}

package com.codevision.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "contests")
public class Contest {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(nullable = false)
    @NotBlank
    @Size(max = 150)
    private String title;

    @Column(
            columnDefinition = "TEXT"
    )
    @Size(max = 5000)
    private String description;

    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;

    @ManyToMany
    @JoinTable(
            name = "contest_problems",
            joinColumns = @JoinColumn(
                    name = "contest_id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "problem_id"
            )
    )
    private List<Problem> problems;

    public Contest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(
            String title
    ) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description
    ) {
        this.description = description;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(
            LocalDateTime startTime
    ) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(
            LocalDateTime endTime
    ) {
        this.endTime = endTime;
    }

    public List<Problem> getProblems() {
        return problems;
    }

    public void setProblems(
            List<Problem> problems
    ) {
        this.problems = problems;
    }
}

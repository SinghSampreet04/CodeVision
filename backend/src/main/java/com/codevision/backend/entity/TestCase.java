package com.codevision.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "test_cases")
public class TestCase {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "problem_id", nullable = false)
    @NotNull
    private Problem problem;

    @Column(columnDefinition = "TEXT")
    @Size(max = 10000)
    private String input;

    @Column(columnDefinition = "TEXT")
    @NotNull
    @Size(max = 10000)
    private String expectedOutput;

    @Column(nullable = false)
    private Boolean hidden = false;

    public TestCase() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public Problem getProblem() {
        return problem;
    }

    public void setProblem(
            Problem problem
    ) {
        this.problem = problem;
    }

    public String getInput() {
        return input;
    }

    public void setInput(
            String input
    ) {
        this.input = input;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(
            String expectedOutput
    ) {
        this.expectedOutput = expectedOutput;
    }

    public Boolean getHidden() {
        return hidden;
    }

    public void setHidden(
            Boolean hidden
    ) {
        this.hidden = hidden;
    }
}

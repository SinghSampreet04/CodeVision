package com.codevision.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "problems")
public class Problem {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(
            columnDefinition = "TEXT",
            nullable = false
    )
    private String description;

    @Column(nullable = false)
    private String difficulty;

    @Column(columnDefinition = "TEXT")
    private String sampleInput;

    @Column(columnDefinition = "TEXT")
    private String sampleOutput;

    public Problem() {
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

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(
            String difficulty
    ) {
        this.difficulty = difficulty;
    }

    public String getSampleInput() {
        return sampleInput;
    }

    public void setSampleInput(
            String sampleInput
    ) {
        this.sampleInput = sampleInput;
    }

    public String getSampleOutput() {
        return sampleOutput;
    }

    public void setSampleOutput(
            String sampleOutput
    ) {
        this.sampleOutput = sampleOutput;
    }
}
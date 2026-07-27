package com.codevision.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "problems")
public class Problem {

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
            columnDefinition = "TEXT",
            nullable = false
    )
    @NotBlank
    @Size(max = 20000)
    private String description;

    @Column(nullable = false)
    @NotBlank
    @Pattern(regexp = "(?i)Easy|Medium|Hard")
    private String difficulty;

    @Column(columnDefinition = "TEXT")
    @Size(max = 10000)
    private String sampleInput;

    @Column(columnDefinition = "TEXT")
    @Size(max = 10000)
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

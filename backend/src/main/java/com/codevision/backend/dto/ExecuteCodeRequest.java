package com.codevision.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ExecuteCodeRequest {

    @NotBlank
    @Size(max = 50000)
    private String code;

    @Size(max = 10000)
    private String input;

    @NotBlank
    @Pattern(regexp = "(?i)java|python|javascript|cpp")
    private String language;

    public ExecuteCodeRequest() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(
            String code
    ) {
        this.code = code;
    }

    public String getInput() {
        return input;
    }

    public void setInput(
            String input
    ) {
        this.input = input;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(
            String language
    ) {
        this.language = language;
    }
}

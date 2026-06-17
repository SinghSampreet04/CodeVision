package com.codevision.backend.service;

public class ExecutionResult {

    private String output;

    private Long runtime;

    public ExecutionResult() {
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(
            String output
    ) {
        this.output = output;
    }

    public Long getRuntime() {
        return runtime;
    }

    public void setRuntime(
            Long runtime
    ) {
        this.runtime = runtime;
    }
}
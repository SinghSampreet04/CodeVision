package com.codevision.backend.service;

public class DecisionResult {

    private String status;

    private int passed;

    private int total;

    public DecisionResult() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status
    ) {
        this.status = status;
    }

    public int getPassed() {
        return passed;
    }

    public void setPassed(
            int passed
    ) {
        this.passed = passed;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(
            int total
    ) {
        this.total = total;
    }
}
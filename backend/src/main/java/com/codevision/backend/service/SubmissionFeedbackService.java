package com.codevision.backend.service;

import org.springframework.stereotype.Service;

@Service
public class SubmissionFeedbackService {

    public String generateFeedback(
            String code,
            String status
    ) {
        if (code == null || code.isBlank()) {
            return "No solution was submitted.";
        }

        return switch (status) {
            case "COMPILATION_ERROR" -> """
                    The solution could not be compiled.

                    Check the syntax, entry-point name, imports, and matching delimiters.
                    """;
            case "RUNTIME_ERROR" -> """
                    The program exited unexpectedly.

                    Check input parsing, indexes, null values, arithmetic operations, and resource usage.
                    """;
            case "TIME_LIMIT_EXCEEDED" -> """
                    The solution exceeded the execution time limit.

                    Review the algorithmic complexity and look for repeated or unbounded work.
                    """;
            case "ACCEPTED" -> """
                    All visible and hidden test cases passed.

                    Consider reviewing the final solution for clarity and documenting its time and space complexity.
                    """;
            case "WRONG_ANSWER" -> wrongAnswerFeedback(code);
            case "NO_TEST_CASES" -> "This problem does not have any test cases yet.";
            default -> "No additional feedback is available for this submission.";
        };
    }

    private String wrongAnswerFeedback(
            String code
    ) {
        boolean readsStandardInput = code.contains("Scanner")
                || code.contains("BufferedReader")
                || code.contains("System.in")
                || code.contains("input(")
                || code.contains("readline")
                || code.contains("readFileSync")
                || code.contains("cin");

        if (!readsStandardInput) {
            return """
                    No standard-input handling was detected.

                    Make sure the solution reads and processes the supplied test-case input.
                    """;
        }

        return """
                One or more test cases produced an unexpected result.

                Recheck edge cases, output formatting, and assumptions that only hold for the sample input.
                """;
    }
}

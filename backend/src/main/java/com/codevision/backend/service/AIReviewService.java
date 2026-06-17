package com.codevision.backend.service;

import org.springframework.stereotype.Service;

@Service
public class AIReviewService {

    public String generateFeedback(
            String code,
            String status
    ) {

        if (
                code == null ||
                code.isBlank()
        ) {

            return """
                    No solution was submitted.
                    """;
        }

        if (
                status.equals(
                        "COMPILATION_ERROR"
                )
        ) {

            return """
                    Your code could not be compiled.

                    Check for missing semicolons,
                    incorrect class names,
                    syntax errors,
                    or unmatched braces.
                    """;
        }

        if (
                status.equals(
                        "RUNTIME_ERROR"
                )
        ) {

            return """
                    Your program crashed while running.

                    Check array indexes,
                    null values,
                    division by zero,
                    and input handling.
                    """;
        }

        if (
                status.equals(
                        "TIME_LIMIT_EXCEEDED"
                )
        ) {

            return """
                    Your solution exceeded the
                    execution time limit.

                    Consider improving the
                    algorithm efficiency.
                    """;
        }

        if (
                status.equals(
                        "ACCEPTED"
                )
        ) {

            return """
                    Great work.

                    Your solution passed all
                    visible and hidden test cases.
                    """;
        }

        if (
                status.equals(
                        "WRONG_ANSWER"
                )
        ) {

            if (
                    !code.contains(
                            "Scanner"
                    )
                    &&
                    !code.contains(
                            "BufferedReader"
                    )
            ) {

                return """
                        No input handling detected.

                        Your solution does not appear
                        to read input from the user.

                        Consider using Scanner or
                        BufferedReader.
                        """;
            }

            if (
                    code.contains(
                            "System.out.println(\"0 1\")"
                    )
            ) {

                return """
                        Your solution appears hardcoded.

                        The program prints a fixed answer
                        instead of processing input.

                        Hidden test cases require a
                        generalized solution.
                        """;
            }

            return """
                    Your solution failed one or more
                    hidden test cases.

                    Review the algorithm and consider
                    edge cases that may not appear in
                    the sample input.
                    """;
        }

        return """
                No feedback available.
                """;
    }
}
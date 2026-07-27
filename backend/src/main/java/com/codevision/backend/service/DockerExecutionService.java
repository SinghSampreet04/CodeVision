package com.codevision.backend.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.Locale;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class DockerExecutionService {

    private static final long CONTAINER_TIMEOUT_SECONDS = 12;
    private static final int MAX_OUTPUT_BYTES = 32_768;

    public ExecutionResult executeCode(
            String code,
            String input,
            String language
    ) {
        return switch (language.toLowerCase(Locale.ROOT)) {
            case "python" -> executeContainer(
                    code,
                    input,
                    "main.py",
                    "python:3.12",
                    "cp /source/main.py .; timeout 3s python main.py"
            );
            case "javascript" -> executeContainer(
                    code,
                    input,
                    "main.js",
                    "node:22",
                    "cp /source/main.js .; timeout 3s node main.js"
            );
            case "cpp" -> executeContainer(
                    code,
                    input,
                    "main.cpp",
                    "gcc:14",
                    "cp /source/main.cpp .; "
                            + "g++ main.cpp -O2 -o main || exit 100; "
                            + "timeout 3s ./main"
            );
            case "java" -> executeContainer(
                    code,
                    input,
                    "Main.java",
                    "eclipse-temurin:21",
                    "cp /source/Main.java .; "
                            + "javac Main.java || exit 100; "
                            + "timeout 3s java Main"
            );
            default -> throw new IllegalArgumentException("Unsupported language");
        };
    }

    private ExecutionResult executeContainer(
            String code,
            String input,
            String fileName,
            String image,
            String command
    ) {
        Path tempDirectory = null;
        String containerName = "codevision-" + UUID.randomUUID();
        long startedAt = System.nanoTime();

        try {
            tempDirectory = Files.createTempDirectory("codevision-execution-");
            Path sourceFile = tempDirectory.resolve(fileName);
            Files.writeString(sourceFile, code, StandardCharsets.UTF_8);
            String boundedCommand = "(" + command + ") > output.txt 2>&1; "
                    + "status=$?; head -c " + MAX_OUTPUT_BYTES + " output.txt; exit $status";

            Process process = new ProcessBuilder(
                    "docker",
                    "run",
                    "--rm",
                    "--name",
                    containerName,
                    "--interactive",
                    "--network",
                    "none",
                    "--memory",
                    "256m",
                    "--memory-swap",
                    "256m",
                    "--cpus",
                    "1",
                    "--pids-limit",
                    "100",
                    "--read-only",
                    "--cap-drop",
                    "ALL",
                    "--security-opt",
                    "no-new-privileges",
                    "--tmpfs",
                    "/workspace:rw,nosuid,nodev,size=64m",
                    "--volume",
                    tempDirectory.toAbsolutePath() + ":/source:ro",
                    "--workdir",
                    "/workspace",
                    image,
                    "sh",
                    "-c",
                    boundedCommand
            )
                    .redirectErrorStream(true)
                    .start();

            try (OutputStream stdin = process.getOutputStream()) {
                if (input != null) {
                    stdin.write(input.getBytes(StandardCharsets.UTF_8));
                }
            }

            boolean finished = process.waitFor(
                    CONTAINER_TIMEOUT_SECONDS,
                    TimeUnit.SECONDS
            );

            if (!finished) {
                removeContainer(containerName);
                process.destroyForcibly();
                return result(
                        "TIME_LIMIT_EXCEEDED",
                        "",
                        startedAt
                );
            }

            byte[] outputBytes = process.getInputStream().readNBytes(MAX_OUTPUT_BYTES);
            String output = new String(outputBytes, StandardCharsets.UTF_8).trim();
            int exitCode = process.exitValue();

            if (exitCode == 100) {
                return result(
                        "COMPILATION_ERROR",
                        output,
                        startedAt
                );
            }

            if (exitCode == 124 || exitCode == 137) {
                return result(
                        "TIME_LIMIT_EXCEEDED",
                        output,
                        startedAt
                );
            }

            if (exitCode != 0) {
                return result(
                        "RUNTIME_ERROR",
                        output,
                        startedAt
                );
            }

            return result(
                    "SUCCESS",
                    output,
                    startedAt
            );
        } catch (IOException exception) {
            throw new IllegalStateException(
                    "Docker is unavailable. Start Docker Desktop and pre-pull the execution images.",
                    exception
            );
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            removeContainer(containerName);
            return result(
                    "RUNTIME_ERROR",
                    "Execution interrupted",
                    startedAt
            );
        } finally {
            deleteDirectory(tempDirectory);
        }
    }

    private ExecutionResult result(
            String status,
            String output,
            long startedAt
    ) {
        ExecutionResult result = new ExecutionResult();
        result.setStatus(status);
        result.setOutput(output);
        result.setRuntime(TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - startedAt));
        return result;
    }

    private void removeContainer(
            String containerName
    ) {
        try {
            new ProcessBuilder("docker", "rm", "--force", containerName)
                    .redirectErrorStream(true)
                    .start()
                    .waitFor(2, TimeUnit.SECONDS);
        } catch (IOException exception) {
            // Docker is already unavailable, so there is nothing else to clean up.
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
        }
    }

    private void deleteDirectory(
            Path directory
    ) {
        if (directory == null) {
            return;
        }

        try (var paths = Files.walk(directory)) {
            paths.sorted(Comparator.reverseOrder()).forEach(path -> {
                try {
                    Files.deleteIfExists(path);
                } catch (IOException ignored) {
                    // The operating system can reclaim a temporary file if cleanup races.
                }
            });
        } catch (IOException ignored) {
            // Cleanup must not replace the execution result with a secondary error.
        }
    }
}

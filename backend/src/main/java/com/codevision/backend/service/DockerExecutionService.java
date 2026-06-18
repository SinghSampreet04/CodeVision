package com.codevision.backend.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.TimeUnit;

@Service
public class DockerExecutionService {

    public ExecutionResult executeCode(
            String code,
            String input,
            String language
    ) {

        return executeJavaCode(
                code,
                input
        );
    }

    public ExecutionResult executeJavaCode(
            String code,
            String input
    ) {

        ExecutionResult result =
                new ExecutionResult();

        try {

            long startTime =
                    System.currentTimeMillis();

            Path tempDir =
                    Files.createTempDirectory(
                            "codevision-docker"
                    );

            File javaFile =
                    new File(
                            tempDir.toFile(),
                            "Main.java"
                    );

            try (
                    FileWriter writer =
                            new FileWriter(
                                    javaFile
                            )
            ) {

                writer.write(
                        code
                );
            }

            String directory =
                    tempDir
                            .toAbsolutePath()
                            .toString();

            Process process =
                    new ProcessBuilder(
                            "docker",
                            "run",
                            "--rm",
                            "-i",
                            "--network",
                            "none",
                            "--memory",
                            "256m",
                            "--cpus",
                            "1",
                            "--pids-limit",
                            "100",
                            "-v",
                            directory +
                                    ":/workspace",
                            "-w",
                            "/workspace",
                            "eclipse-temurin:21",
                            "sh",
                            "-c",
                            "javac Main.java && java Main"
                    ).start();

            OutputStream stdin =
                    process.getOutputStream();

            if (input != null) {

                stdin.write(
                        input.getBytes()
                );
            }

            stdin.flush();

            stdin.close();

            boolean finished =
                    process.waitFor(
                            3,
                            TimeUnit.SECONDS
                    );

            long endTime =
                    System.currentTimeMillis();

            result.setRuntime(
                    endTime - startTime
            );

            if (!finished) {

                process.destroyForcibly();

                result.setOutput(
                        "TIME_LIMIT_EXCEEDED"
                );

                return result;
            }

            String output =
                    new String(
                            process
                                    .getInputStream()
                                    .readAllBytes()
                    );

            String errors =
                    new String(
                            process
                                    .getErrorStream()
                                    .readAllBytes()
                    );

            int exitCode =
                    process.exitValue();

            if (exitCode != 0) {

                if (
                        errors.contains(
                                "Exception"
                        )
                ) {

                    result.setOutput(
                            "RUNTIME_ERROR"
                    );

                    return result;
                }

                result.setOutput(
                        "COMPILATION_ERROR"
                );

                return result;
            }

            result.setOutput(
                    output.trim()
            );

            return result;

        } catch (Exception e) {

            result.setOutput(
                    "RUNTIME_ERROR"
            );

            result.setRuntime(
                    0L
            );

            return result;
        }
    }
}
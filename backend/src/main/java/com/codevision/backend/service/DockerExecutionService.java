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

    public String executeJavaCode(
            String code,
            String input
    ) {

        try {

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
                            new FileWriter(javaFile)
            ) {
                writer.write(code);
            }

            String directory =
                    tempDir.toAbsolutePath()
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
                            directory + ":/workspace",

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

            if (!finished) {

                process.destroyForcibly();

                return "TIME_LIMIT_EXCEEDED";
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
                    return "RUNTIME_ERROR";
                }

                return "COMPILATION_ERROR";
            }

            return output.trim();

        } catch (Exception e) {

            return "RUNTIME_ERROR";
        }
    }
}
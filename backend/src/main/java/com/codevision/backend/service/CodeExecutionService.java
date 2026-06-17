package com.codevision.backend.service;

import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.TimeUnit;

@Service
public class CodeExecutionService {

    public String executeJavaCode(
            String code,
            String input
    ) {

        try {

            Path tempDir =
                    Files.createTempDirectory(
                            "codevision"
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

            Process compileProcess =
                    new ProcessBuilder(
                            "javac",
                            "Main.java"
                    )
                            .directory(
                                    tempDir.toFile()
                            )
                            .start();

            int compileExitCode =
                    compileProcess.waitFor();

            if (compileExitCode != 0) {

                BufferedReader errorReader =
                        new BufferedReader(
                                new InputStreamReader(
                                        compileProcess.getErrorStream()
                                )
                        );

                StringBuilder errors =
                        new StringBuilder();

                String line;

                while (
                        (line = errorReader.readLine())
                                != null
                ) {
                    errors
                            .append(line)
                            .append("\n");
                }

                return "COMPILATION ERROR:\n"
                        + errors;
            }

            Process runProcess =
                    new ProcessBuilder(
                            "java",
                            "Main"
                    )
                            .directory(
                                    tempDir.toFile()
                            )
                            .start();

            if (
                    input != null &&
                    !input.isBlank()
            ) {

                OutputStream os =
                        runProcess.getOutputStream();

                os.write(
                        input.getBytes()
                );

                os.flush();
                os.close();
            }

            boolean finished =
                    runProcess.waitFor(
                            2,
                            TimeUnit.SECONDS
                    );

            if (!finished) {

                runProcess.destroyForcibly();

                return "TIME_LIMIT_EXCEEDED";
            }

            BufferedReader outputReader =
                    new BufferedReader(
                            new InputStreamReader(
                                    runProcess.getInputStream()
                            )
                    );

            StringBuilder output =
                    new StringBuilder();

            String line;

            while (
                    (line = outputReader.readLine())
                            != null
            ) {
                output
                        .append(line)
                        .append("\n");
            }

            return output
                    .toString()
                    .trim();

        } catch (Exception e) {

            return "ERROR: "
                    + e.getMessage();
        }
    }
}
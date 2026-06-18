package com.codevision.backend.service;

import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.TimeUnit;

@Service
public class CodeExecutionService {

    public String executeCode(
            String code,
            String input,
            String language
    ) {

        if (
                "python".equalsIgnoreCase(
                        language
                )
        ) {

            return executePythonCode(
                    code,
                    input
            );
        }

        if (
                "javascript".equalsIgnoreCase(
                        language
                )
        ) {

            return executeJavaScriptCode(
                    code,
                    input
            );
        }

        if (
                "cpp".equalsIgnoreCase(
                        language
                )
        ) {

            return executeCppCode(
                    code,
                    input
            );
        }

        return executeJavaCode(
                code,
                input
        );
    }

    private String executeJavaCode(
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
                            new FileWriter(
                                    javaFile
                            )
            ) {

                writer.write(
                        code
                );
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

            if (
                    compileExitCode != 0
            ) {

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
                        (line =
                                errorReader.readLine())
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
                    (line =
                            outputReader.readLine())
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

    private String executePythonCode(
            String code,
            String input
    ) {

        try {

            Path tempDir =
                    Files.createTempDirectory(
                            "codevision"
                    );

            File pyFile =
                    new File(
                            tempDir.toFile(),
                            "main.py"
                    );

            Files.writeString(
                    pyFile.toPath(),
                    code
            );

            Process process =
                    new ProcessBuilder(
                            "python3",
                            "main.py"
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
                        process.getOutputStream();

                os.write(
                        input.getBytes()
                );

                os.close();
            }

            boolean finished =
                    process.waitFor(
                            2,
                            TimeUnit.SECONDS
                    );

            if (!finished) {

                process.destroyForcibly();

                return "TIME_LIMIT_EXCEEDED";
            }

            return new String(
                    process
                            .getInputStream()
                            .readAllBytes()
            ).trim();

        } catch (Exception e) {

            return "ERROR: "
                    + e.getMessage();
        }
    }

    private String executeJavaScriptCode(
            String code,
            String input
    ) {

        try {

            Path tempDir =
                    Files.createTempDirectory(
                            "codevision"
                    );

            File jsFile =
                    new File(
                            tempDir.toFile(),
                            "main.js"
                    );

            Files.writeString(
                    jsFile.toPath(),
                    code
            );

            Process process =
                    new ProcessBuilder(
                            "node",
                            "main.js"
                    )
                            .directory(
                                    tempDir.toFile()
                            )
                            .start();

            boolean finished =
                    process.waitFor(
                            2,
                            TimeUnit.SECONDS
                    );

            if (!finished) {

                process.destroyForcibly();

                return "TIME_LIMIT_EXCEEDED";
            }

            return new String(
                    process
                            .getInputStream()
                            .readAllBytes()
            ).trim();

        } catch (Exception e) {

            return "ERROR: "
                    + e.getMessage();
        }
    }

    private String executeCppCode(
            String code,
            String input
    ) {

        try {

            Path tempDir =
                    Files.createTempDirectory(
                            "codevision"
                    );

            File cppFile =
                    new File(
                            tempDir.toFile(),
                            "main.cpp"
                    );

            Files.writeString(
                    cppFile.toPath(),
                    code
            );

            Process compile =
                    new ProcessBuilder(
                            "g++",
                            "main.cpp",
                            "-o",
                            "main"
                    )
                            .directory(
                                    tempDir.toFile()
                            )
                            .start();

            int compileResult =
                    compile.waitFor();

            if (
                    compileResult != 0
            ) {

                return "COMPILATION ERROR";
            }

            Process run =
                    new ProcessBuilder(
                            "./main"
                    )
                            .directory(
                                    tempDir.toFile()
                            )
                            .start();

            boolean finished =
                    run.waitFor(
                            2,
                            TimeUnit.SECONDS
                    );

            if (!finished) {

                run.destroyForcibly();

                return "TIME_LIMIT_EXCEEDED";
            }

            return new String(
                    run
                            .getInputStream()
                            .readAllBytes()
            ).trim();

        } catch (Exception e) {

            return "ERROR: "
                    + e.getMessage();
        }
    }
}
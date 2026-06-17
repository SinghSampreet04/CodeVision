package com.codevision.backend.controller;

import com.codevision.backend.dto.ExecuteCodeRequest;
import com.codevision.backend.service.CodeExecutionService;
import com.codevision.backend.service.DockerExecutionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/execute")
public class ExecutionController {

    private final CodeExecutionService codeExecutionService;

    private final DockerExecutionService dockerExecutionService;

    public ExecutionController(
            CodeExecutionService codeExecutionService,
            DockerExecutionService dockerExecutionService
    ) {
        this.codeExecutionService =
                codeExecutionService;

        this.dockerExecutionService =
                dockerExecutionService;
    }

    @PostMapping
    public String executeCode(
            @RequestBody ExecuteCodeRequest request
    ) {

        return codeExecutionService
                .executeJavaCode(
                        request.getCode(),
                        request.getInput()
                );
    }

    @PostMapping("/docker")
    public String executeCodeInDocker(
            @RequestBody ExecuteCodeRequest request
    ) {

        return dockerExecutionService
                .executeJavaCode(
                        request.getCode(),
                        request.getInput()
                );
    }
}
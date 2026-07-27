package com.codevision.backend.controller;

import com.codevision.backend.dto.ExecuteCodeRequest;
import com.codevision.backend.service.DockerExecutionService;
import com.codevision.backend.service.ExecutionResult;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/execute")
public class ExecutionController {

    private final DockerExecutionService dockerExecutionService;

    public ExecutionController(
            DockerExecutionService dockerExecutionService
    ) {
        this.dockerExecutionService =
                dockerExecutionService;
    }

    @PostMapping
    public ExecutionResult executeCode(
            @Valid @RequestBody ExecuteCodeRequest request
    ) {
        return dockerExecutionService
                .executeCode(
                        request.getCode(),
                        request.getInput(),
                        request.getLanguage()
                );
    }
}

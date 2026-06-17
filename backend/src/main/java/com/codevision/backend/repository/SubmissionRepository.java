package com.codevision.backend.repository;

import com.codevision.backend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository
        extends JpaRepository<Submission, Long> {

    List<Submission> findByUserId(
            Long userId
    );

    List<Submission> findByProblemId(
            Long problemId
    );

    List<Submission>
    findByProblemIdAndStatusOrderByRuntimeAsc(
            Long problemId,
            String status
    );
}
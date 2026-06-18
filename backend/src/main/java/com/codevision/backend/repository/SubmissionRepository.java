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

    List<Submission> findByUserIdAndProblemId(
            Long userId,
            Long problemId
    );

    List<Submission>
    findByProblemIdAndStatusOrderByRuntimeAsc(
            Long problemId,
            String status
    );

    List<Submission>
    findByContestId(
            Long contestId
    );

    long countByProblemId(
            Long problemId
    );

    long countByProblemIdAndStatus(
            Long problemId,
            String status
    );

    long countDistinctUserIdByProblemIdAndStatus(
            Long problemId,
            String status
    );

    long countByUserId(
            Long userId
    );

    long countByUserIdAndStatus(
            Long userId,
            String status
    );
}
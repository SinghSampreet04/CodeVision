package com.codevision.backend.repository;

import com.codevision.backend.entity.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionRepository
        extends JpaRepository<Discussion, Long> {

    List<Discussion>
    findByProblemIdOrderByCreatedAtDesc(
            Long problemId
    );
}
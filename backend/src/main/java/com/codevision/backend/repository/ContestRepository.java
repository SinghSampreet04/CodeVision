package com.codevision.backend.repository;

import com.codevision.backend.entity.Contest;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContestRepository
        extends JpaRepository<Contest, Long> {

    @Override
    @EntityGraph(attributePaths = "problems")
    List<Contest> findAll();

    @Override
    @EntityGraph(attributePaths = "problems")
    Optional<Contest> findById(Long id);
}

package com.codevision.backend.repository;

import com.codevision.backend.entity.Contest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContestRepository
        extends JpaRepository<Contest, Long> {
}
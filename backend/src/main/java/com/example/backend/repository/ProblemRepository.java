package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Problem;

public interface ProblemRepository extends JpaRepository<Problem,Integer> {
    
}

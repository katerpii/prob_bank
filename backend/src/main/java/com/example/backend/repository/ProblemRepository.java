package com.example.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.Problem;

public interface ProblemRepository extends JpaRepository<Problem, Integer> {
    // 기본적인 CRUD 메서드가 자동 생성됩니다.
}

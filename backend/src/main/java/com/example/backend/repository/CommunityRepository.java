package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Community;

@Repository
public interface CommunityRepository extends JpaRepository<Community,Integer> {
    
}

package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Community;

public interface CommunityRepository extends JpaRepository<Community,Integer> {
    
}

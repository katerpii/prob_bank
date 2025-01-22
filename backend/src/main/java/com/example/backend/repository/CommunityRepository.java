package com.example.backend.repository;

import org.springframework.stereotype.Repository;
import com.example.backend.entity.CommunityDto;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CommunityRepository extends JpaRepository<CommunityDto,Integer> {
    
}

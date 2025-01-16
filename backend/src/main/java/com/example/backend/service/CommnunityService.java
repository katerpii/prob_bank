package com.example.backend.service;

import org.springframework.stereotype.Service;

import com.example.backend.entity.CommunityDto;
import com.example.backend.repository.CommunityRepository;

@Service
public class CommnunityService {

    private final CommunityRepository commnunityRepository;

    public CommnunityService(CommunityRepository commnunityRepository){
        this.commnunityRepository= commnunityRepository;
    }
    
    public CommunityDto addPost(CommunityDto post){
        return commnunityRepository.save(post);
    }
}

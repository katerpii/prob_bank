package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.repository.*;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CommunityService {

    final private CommunityRepository communityRepository;

    // 게시글 추가 api
    public Community addPost(Community post){
        return communityRepository.save(post);
    } 
    // 게시글 전체 조회 api
    public List<Community> getAllPost(List<Community> allpost){
        allpost = communityRepository.findAll();
        return allpost;
    }
    // 게시글 상세 조회 api
    public Optional<Community> getDetailPost(Integer id){
        Optional<Community> detailPost = communityRepository.findById(id);
        return detailPost;
    }

}

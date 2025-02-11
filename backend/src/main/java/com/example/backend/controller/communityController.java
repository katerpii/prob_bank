package com.example.backend.controller;

import com.example.backend.service.*;
import com.example.backend.entity.*;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PatchExchange;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@AllArgsConstructor
public class communityController {
    final private CommunityService communityService;
    
    //게시글 추가 api
    @PostMapping("/community/addpost")
    public ResponseEntity<Community> addPost(@RequestBody Community input) {
        Community addPost=communityService.addPost(input);
        return ResponseEntity.ok(addPost);
    }

    // 게시글 전체 조회 api
    @GetMapping("/community")
    public ResponseEntity<List<Community>> getAllPost() {
        List<Community> allpost = new ArrayList<Community>();
        allpost = communityService.getAllPost(allpost);
        return ResponseEntity.ok(allpost);  
    }

    // 게시글 상세 조회 api
    @GetMapping("/community/{id}")
    public ResponseEntity<Optional<Community>> getDtailPost(@PathVariable Integer id) {
        Optional<Community> post = communityService.getDetailPost(id); 
        return ResponseEntity.ok(post);
    }

    // 게시글 수정 api
    @PutMapping("community/updatepost/{id}")
    public ResponseEntity<Community> updatePost(@PathVariable Integer id, @RequestBody Community post) {
        Community updatedpost=communityService.updatePost(id,post);
        return ResponseEntity.ok(updatedpost);
    }
    
    // 게시글 삭제 api
    @DeleteMapping("/community/deletepost/{id}")
    public String deletePost(@PathVariable Integer id){
        String deletepost = communityService.deletePost(id);
        return deletepost;
    }
    
    
}

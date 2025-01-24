package com.example.backend.controller;

import com.example.backend.config.auth.UserDetailService;
import com.example.backend.entity.CommunityDto;
import com.example.backend.service.CommnunityService;

import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
public class CommunityController {
    private final CommnunityService communityService;

    // 게시글 조회(전체글 보여주기)
    @GetMapping("/community")
    public ResponseEntity<List<CommunityDto>> getAllPost(){
        List<CommunityDto> post= communityService.getAllPost();
        return ResponseEntity.ok(post);
    }
    
    // 게시글 추가 
    @PostMapping("/addpost")
    public ResponseEntity<CommunityDto> addPost(@RequestBody CommunityDto post) {
        CommunityDto savedPost=communityService.addPost(post);
        return ResponseEntity.ok(savedPost); 
    }
    // 게시글 삭제 
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Integer id) {
        communityService.deletePost(id);
        return ResponseEntity.ok("Post deleted successfully.");
    }
}   
package com.example.backend.controller;

import com.example.backend.config.auth.UserDetailService;
import com.example.backend.entity.CommunityDto;
import com.example.backend.service.CommnunityService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class CommunityController {
    private final CommnunityService communityService;
    @PostMapping("/addpost")
    public ResponseEntity<CommunityDto> addPost(@RequestBody CommunityDto post) {
        CommunityDto savedPost=communityService.addPost(post);
        return ResponseEntity.ok(savedPost); 
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Integer id) {
        communityService.deletePost(id);
        return ResponseEntity.ok("Post deleted successfully.");
    }
}   
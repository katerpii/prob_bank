package com.example.backend.user.controller;

import com.example.backend.entity.CommunityDto;
import com.example.backend.service.CommnunityService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class CommunityController {
    private final CommnunityService commnunityService;

    public CommunityController(CommnunityService commnunityService){
        this.commnunityService=commnunityService;
    }

    @PostMapping("/addpost")
    public ResponseEntity<CommunityDto> addPost(@RequestBody CommunityDto post) {
        CommunityDto savedPost=commnunityService.addPost(post);
        return ResponseEntity.ok(savedPost); 
    }
}
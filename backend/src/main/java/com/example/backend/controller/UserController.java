package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.service.UserService;
import com.example.backend.entity.User;

// Security configuration은 시간이 좀 걸릴듯.. 
@RestController
public class UserController {
    private UserService userService;

    @GetMapping("/join")
    public ResponseEntity<Void> join(@RequestBody User user){
        userService.joinUser(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user){
        userService.loginProc();
        return ResponseEntity.ok(user);
    }
}

package com.example.backend.user.controller;
import com.example.backend.user.*;
import com.example.backend.service.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import lombok.RequiredArgsConstructor;
import java.util.Map;
import java.util.HashMap;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

// 요청(브라우저, api, 클라이어트 등)을 받고 응답을 반환하는 진입점 역할로, http 요청/응답 처리 담당

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<Void> join(@RequestBody User user){
        userService.joinUser(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/loginOk")
    public ResponseEntity<Map<String, String>> loginOk(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        String authorities = authentication.getAuthorities().toString();

        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("email", email);
        userInfo.put("authorities", authorities);

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/logoutOk")
    public ResponseEntity<Void> logoutOk(){
        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin")
    public ResponseEntity<Void> getAdminPage(){
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserPage() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userService.getUserInfo(email);

        return ResponseEntity.ok(user);
    }
}

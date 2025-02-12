// package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.service.UserService;

import lombok.AllArgsConstructor;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.dto.userDto.*;
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/join")
    public ResponseEntity<Void> join(@RequestBody JoinRequestDto form){
        userService.joinUser(form);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto form, HttpServletRequest request){
        boolean isLoginSuccess = userService.loginProc(form);

        if (isLoginSuccess){
            HttpSession session = request.getSession(true);
            session.setAttribute("user_email", form.getEmail());

            User user = userRepository.findByUserEmail(form.getEmail());
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body("Login Failed");
    }
}

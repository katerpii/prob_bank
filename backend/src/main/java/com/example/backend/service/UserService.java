package com.example.backend.service;

import jakarta.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.backend.repository.UserRepository;
import com.example.backend.entity.User;

import lombok.AllArgsConstructor;

import com.example.backend.entity.User;

import com.example.backend.dto.userDto.*;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void joinUser(JoinRequestDto form){
        if (userRepository.findByUserEmail(form.getEmail()) == null){
            String encodedPassword = passwordEncoder.encode(form.getPassword());
            User user = User.builder()
                .username(form.getName())
                .password(encodedPassword)
                .userEmail(form.getEmail())
                .role("USER")
                .build();

            userRepository.save(user);
        }
    }

    // public void loginProc(LoginRequestDto form){
    //     User targetUser = userRepository.findByEmail(form.getEmail());
    //     if (targetUser == null){
    //         // 오류 처리
    //     }

    //     String formPassword = passwordEncoder.encode(form.getPassword());            

    //     if (passwordEncoder.matches(form.getPassword(), targetUser.getPassword())){
    //         // HttpSession session = form.getSession(true);
    //     }
    // }
}

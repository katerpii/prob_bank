package com.example.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.backend.repository.UserRepository;

import lombok.AllArgsConstructor;

import com.example.backend.dto.userDto.JoinRequestDto;
import com.example.backend.dto.userDto.LoginRequestDto;
import com.example.backend.entity.User;

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

    public boolean loginProc(LoginRequestDto form){
        User targetUser = userRepository.findByUserEmail(form.getEmail());
        if (targetUser == null){
            // HttpSession session = form.getSession(true);
            return false;
        }
        return passwordEncoder.matches(form.getPassword(), targetUser.getPassword());
    }
}

package com.example.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.entity.*;
import com.example.backend.repository.*;

import lombok.RequiredArgsConstructor;

// 핵심 비지니스 로직을 담당, 데이터 처리 및 DB와의 상호작용
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void joinUser(User user){
        String plain_Password = user.getPassword();
        String encrypted_Password = bCryptPasswordEncoder.encode(plain_Password);
        
        user.setPassword(encrypted_Password);
        user.setRole("ROLE_USER");
        userRepository.save(user);
    }

    public User getUserInfo(String email){
        User user = userRepository.findByUserEmail(email);
        return user;
    }
}

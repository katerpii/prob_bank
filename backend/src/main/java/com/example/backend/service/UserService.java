package com.example.backend.service;

import org.springframework.stereotype.Service;
import com.example.backend.repository.UserRepository;
import com.example.backend.entity.User;

@Service
public class UserService {

    private UserRepository userRepository;

    public void joinUser(User user){
        String targetUserEmail = user.getUserEmail();

        if (userRepository.findByEmail(targetUserEmail) == null){
            user.setRole("USER");
            userRepository.save(user);
        }
    }

    public void loginProc(){
        
    }
}

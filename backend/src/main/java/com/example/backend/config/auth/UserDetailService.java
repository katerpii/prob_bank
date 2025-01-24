package com.example.backend.config.auth;
import com.example.backend.repository.UserRepository;
import com.example.backend.entity.User;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.Collections;

import lombok.RequiredArgsConstructor;

// UserDetailService .. DB를 통한 조회 및 UserDetails 객체 생성
@Service
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        User user = userRepository.findByUseremail(email);
        if (user == null){
            throw new UsernameNotFoundException("User not found with id: " + email);
        }
    

        return new org.springframework.security.core.userdetails.User(
            user.getUseremail(),
            user.getPassword(),
            Collections.singleton(new SimpleGrantedAuthority(user.getRole())));
    }
    // 현재 인증된(로그인을 성공한) 유저의 id 반환 
    public String getCurrentUsername() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails) {
        return ((UserDetails) principal).getUsername();
    }
    return null;
    }
}
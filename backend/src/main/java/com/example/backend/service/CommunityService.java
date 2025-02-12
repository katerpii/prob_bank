package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.repository.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import com.example.backend.controller.CommunityController;
import com.example.backend.dto.communityDto.AllPostViewDto;
import com.example.backend.dto.communityDto.CommunityRequestDto;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CommunityService {

    final private CommunityRepository communityRepository;
    final private UserRepository userRepository;

    public static Community OptionaltoCommunity(Optional<Community> object){
        return (Community)object.orElse(null) ;   
    }

    // 게시글 추가 api
    public Community addPost(CommunityRequestDto input, HttpSession session){
        // 이메일 추출 
        String userEmail = (String) session.getAttribute("user_email");
        // 해당 이메일 기반 작성자 객체 생성 
        User author = userRepository.findByUserEmail(userEmail);

        Community newPost = new Community();
        newPost.setAuthor(author);
        newPost.setTitle(input.getTitle());
        newPost.setContent(input.getContent());

        return communityRepository.save(newPost);
    } 
    // 게시글 전체 조회 api
    public List<Community> getAllPost(List<Community> allpost){
        allpost = communityRepository.findAll();
        return allpost;
    }
    // 게시글 상세 조회 api
    public Optional<Community> getDetailPost(Integer id){
        Optional<Community> detailPost = communityRepository.findById(id);
        return detailPost;
    }
    // 게시글 수정 api
    public Community updatePost(Integer id , Community post){
        Optional<Community> findUpdatePost = communityRepository.findById(id);
        Community updatepost =OptionaltoCommunity(findUpdatePost);
        post.setBoard_id(id);
        System.out.println(post);
        updatepost = post;
        return communityRepository.save(updatepost);
    }

    // 게시글 삭제 api
    public String deletePost(Integer id){
        Optional<Community> findDeletePost = communityRepository.findById(id);
        Community deletePost= OptionaltoCommunity(findDeletePost);
        communityRepository.delete(deletePost);
        return "Post delete succescs";
    }
}

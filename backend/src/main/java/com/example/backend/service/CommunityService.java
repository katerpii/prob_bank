package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.repository.*;
import com.example.backend.dto.*;

import jakarta.servlet.http.HttpSession;


import com.example.backend.dto.communityDto.CommunityRequestDto;

import java.util.List;
import java.util.Optional;


import org.springframework.http.ResponseEntity;
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
    public CommunityRequestDto getDetailPost(Integer id){
        // 커뮤니티 객체로 게시글 조회 
        Optional<Community> findDetailPost = communityRepository.findById(id);
        // dto변환을 위한 Optinal<T> 에서 community 객체로 다시 변환 
        Community convertDetailPost = OptionaltoCommunity(findDetailPost);
        // entity -> dto 변환 후 dto 반환
        CommunityRequestDto detailPost= new CommunityRequestDto();
        detailPost.setAuthor(convertDetailPost.getAuthor().getUserEmail());
        detailPost.setTitle(convertDetailPost.getTitle());
        detailPost.setCreate_At(convertDetailPost.getCreate_date());

        return detailPost;
    }
    // 게시글 수정 api
    public void updatePost(Integer id , CommunityRequestDto post,HttpSession session){
        // 로그인된 (인증된) 이메일 추출 
        String userEmail =(String) session.getAttribute("user_email");
        Optional<Community> findUpdatePost = communityRepository.findById(id);
        Community updatepost =OptionaltoCommunity(findUpdatePost);
        if(userEmail.equals(updatepost.getAuthor().getUserEmail())){
            updatepost.setBoard_id(id);
            updatepost.setContent(post.getContent());
            updatepost.setTitle(post.getTitle());
            updatepost.setUpdated(true);

            communityRepository.save(updatepost);
        }
        else{
            ResponseEntity.status(400).body("not updated post");
        }
    }

    // 게시글 삭제 api
    public String deletePost(Integer id,HttpSession session){
        // 로그인된(인증된) 사용자 이메일 추출
        String userEmail = (String)session.getAttribute("user_email");
        // 삭제할 게시글 조회
        Optional<Community> findDeletePost = communityRepository.findById(id);
        Community deletePost= OptionaltoCommunity(findDeletePost);
        // 게시글의 작성자와 로그인된(인증된) 사용자의 이메일을 비교 하여 같으면 삭제
        if(userEmail.equals(deletePost.getAuthor().getUserEmail())){
            communityRepository.delete(deletePost);
            return "Post delete succescs";
        }
        else{
            return "Post not delete";
        }
        
        
    }
}

package com.example.backend.service;

import org.springframework.stereotype.Service;

import com.example.backend.entity.CommunityDto;
import com.example.backend.entity.User;
import com.example.backend.exception.UnauthorizedAccessException;
import com.example.backend.repository.CommunityRepository;
import com.example.backend.config.auth.UserDetailService;
import com.example.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommnunityService {

    private final CommunityRepository communityRepository;
    private final UserDetailService userDetailService;
    private final UserRepository userRepository;
    // 게시글 추가 api
    public CommunityDto addPost(CommunityDto post){
        return communityRepository.save(post);
    }
    // 게시글 삭제 api
    @Transactional
    public void deletePost(Integer board_id) {
        // 글 조회
        String currentUsername=userDetailService.getCurrentUsername();
        CommunityDto post = communityRepository.findById(board_id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        // 작성자 확인 //getUsername()메서드 오류 떠도 실행됨 왜 그런건지 모르겠어요... 죄송해요 그냥 안고치고 하시면 되요 ㅎㅎ 
        if (!post.getAuthor().getUsername().equals(currentUsername)) {
            throw new UnauthorizedAccessException("You are not authorized to delete this post.");
        }

        // 삭제
        communityRepository.delete(post);
    }

}
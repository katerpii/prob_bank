package com.example.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.entity.Comment;
import com.example.backend.entity.Community;
import com.example.backend.entity.User;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.CommunityRepository;
import com.example.backend.repository.UserRepository;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CommentService {

    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final CommentRepository commentRepository;

    public void addComment(String content, Integer board_id, HttpSession session){
        String currentAuthorEmail = (String) session.getAttribute("user_email");
        User commentAuthor = userRepository.findByUserEmail(currentAuthorEmail);
        Optional<Community> post = communityRepository.findById(board_id);

        Comment newComment = Comment.builder()
            .board_id(CommunityService.OptionaltoCommunity(post))
            .commentAuthor(commentAuthor)
            .content(content)
            .build();

        commentRepository.save(newComment);
    }
    
}

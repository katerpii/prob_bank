package com.example.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.CommentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
// import lombok.NoArgsConstructor;
import lombok.NoArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/community/addcomment/{board_id}")
    public ResponseEntity<?> addComment(@RequestBody String content, @PathVariable Integer board_id, HttpServletRequest request) {
        if (board_id == null){
            return ResponseEntity.status(401).body("A Post Not Exist");
        }

        HttpSession session = request.getSession(false);
        if (session == null){
            return ResponseEntity.status(401).build();
        }
        
        commentService.addComment(content, board_id, session);

        return ResponseEntity.ok().build();
    }
    

}

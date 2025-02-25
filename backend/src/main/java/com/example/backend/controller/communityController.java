package com.example.backend.controller;

import com.example.backend.service.*;
import com.example.backend.entity.*;
import com.example.backend.dto.communityDto.*;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class communityController {

    final private CommunityService communityService;
    
    //게시글 추가 api
    /** 프론트단에서 요청 Dto 형식(제목, 내용)으로 JSON form Request
     *  이 때 해당 Request의 Session Id를 활용
     *  Session에는 user_email이 포함되어있기 때문에 현재 로그인한 사용자의 email 추출 가능
     *  예외 처리 후 Service layer에서 추출한 email로 user 객체 반환(findByUserEmail) 후 author로 설정
     *  author는 User를 참조하기 때문에 참조하는 필드값 user_email이 db단에 저장되는듯 
     *  이러면 외래키의 User 객체 참조 유지하면서 세션 기반 자동 작성자 설정이 가능 
     */
    @PostMapping("/community/addpost")
    public ResponseEntity<?> addPost(@RequestBody CommunityRequestDto input, HttpServletRequest request) { // Spring이 알아서 Http request 파싱 해줌 
        HttpSession session = request.getSession(false); // 없으면 null 반환 

        // @예외처리
        // request.getsession == null: 요청에 session이 포함되지 않았다. 즉, 로그인 되지 않은 사용자의 요청
        // session.getAttribute("user_email") == null: 세션에 포함된 user_email값이 없다. 즉, 서버가 발급한(유효한) 세션id가 아니다
        // -> status 400 반환 
        if (session == null || session.getAttribute("user_email") == null){
            return ResponseEntity.status(400).build();
        }

        // Dto form과 검증된 session으로 service 레이어에서 로직 처리 
        Community addPost=communityService.addPost(input, session);
        return ResponseEntity.ok(addPost);
    }

    // 게시글 전체 조회 api
    // dto로 구현중 findAll() 메서드의 반환값이 List<T>로 반환 되어 힘듦 
    @GetMapping("/community") 
    public ResponseEntity<?> getAllPost() {
        List<Community> allpost = new ArrayList<Community>(); 
        allpost = communityService.getAllPost(allpost);
        return ResponseEntity.ok(allpost);  
    }

    // 게시글 상세 조회 api
    // dto 변환 으로 title,author,create at만 반환 
    @GetMapping("/community/{id}")
    public ResponseEntity<?> getDetailPost(@PathVariable Integer id) {
        CommunityRequestDto post = communityService.getDetailPost(id); 
        return ResponseEntity.ok(post);
    }

    // 게시글 수정 api
    @PutMapping("/community/updatepost/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Integer id, @RequestBody CommunityRequestDto post, HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if(session ==null || session.getAttribute("user_email")==null){
            return ResponseEntity.status(400).body("No session in request or  Not a valid session");
        }
        communityService.updatePost(id,post,session);
        return ResponseEntity.ok().body("success update");
    }
    
    // 게시글 삭제 api
    @DeleteMapping("/community/deletepost/{id}")
    public String deletePost(@PathVariable Integer id,HttpServletRequest request){
        HttpSession session = request.getSession(false);

        if(session == null || session.getAttribute("user_email")==null){
            ResponseEntity.status(400).body("No session in request or  Not a valid session");
        }
        String deletepost = communityService.deletePost(id,session);
        return deletepost;
    }
}
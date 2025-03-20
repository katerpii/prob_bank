package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ProblemDto.AddProblemDto;
import com.example.backend.entity.*;
import com.example.backend.repository.UserRepository;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import com.example.backend.service.ProblemService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProblemController {

    private final ProblemService problemService; //서비스 클래스 사용(정보가져옴)
    private final UserRepository userRepository;
    

    @GetMapping("/list")
    public List<Problem> getProblemList(){
        List<Problem> problems=problemService.getProblemList();
        return problems;
    }

    @GetMapping("/get/{id}")
    public Optional<Problem> getProblemindex(@PathVariable Integer id) {
        return problemService.getProblemId(id);
    }

    //문제추가
    @PostMapping("/addproblem")
    public ResponseEntity<?> addProblem (@RequestBody AddProblemDto problemform , HttpServletRequest request ){
        HttpSession session=request.getSession(false); //true->새로만듦 , false-> null ,세션객체반환
        String useremail =(String)session.getAttribute("user_email"); //로그인(set)
        User user= userRepository.findByUserEmail(useremail);

        if(user.getRole()=="USER"){
            return ResponseEntity.status(403).body(null);
        } 

        problemService.addProblem(problemform);
        return ResponseEntity.ok().body(null);

    }

    @PostMapping("/problem/submit")
    public ResponseEntity<?> correctCompare(@RequestBody String code){
        try{
            FileWriter submit = new FileWriter("C:\\source\\submit.c");
            submit.write(code);
            submit.close();
        }
        catch(IOException error){
            System.out.println("error");
            return ResponseEntity.ok().body("wrong");
        }

        boolean result = problemService.getAnswer(code);
        return ResponseEntity.ok().body("correct");
    }    
}

package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repository.ProblemRepository;
import com.example.backend.entity.*;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import com.example.backend.dto.ProblemDto.AddProblemDto;


@Service
// service , serviceimpl 나누기 ?
//service가 repository에서 데이터 조회

public class ProblemService {
    
    private final ProblemRepository problemRepository;
    
    @Autowired
    public ProblemService(ProblemRepository problemRepository){
        this.problemRepository=problemRepository;
    }
    //1. db에서 문제 조회후 반환
    public List<Problem>getProblemList(){
        return this.problemRepository.findAll();
    }

    //2. 특정 문제 조회 
    public Optional<Problem> getProblemId(Integer id){
        return problemRepository.findById(id);
    }
    
    public void addProblem (AddProblemDto problemform) {
        //저장하기(dtd), 새로운 객체 생성 해서 저장
        Problem newProblem = new Problem();
        newProblem.setTitle(problemform.getTitle());
        newProblem.setDescription(problemform.getDescription());
        newProblem.setType(problemform.getType());
        problemRepository.save(newProblem);

    }
    // 일단 문제 리스트 + 상세조회 완성해야됌 -> 테스트 문제 하나 DB 등록
    // -> 프론트에서 제출 폼 만드는 대로 컴파일 관련 api 보완 
    public boolean getAnswer(String code) {
        ProcessBuilder processBuilder = new ProcessBuilder("docker build . --tag submit", "docker run submit");
        processBuilder.directory(new File("C:\\source\\"));
        try {
            Process process = processBuilder.start();
            // if (process == null){
            //     throw new IOException();
            // }
            int exitCode = process.waitFor(); 

            if (exitCode == 0){
                return true;
            }
            else {
                // throw new InterruptedException();
                return false;
            }
        } catch(IOException e){ 
            e.printStackTrace();
            return false;
        } catch(InterruptedException error){
            error.printStackTrace();
            return false;
        }
    }

    public static Problem Optionalto(Optional<Problem> object){
        return (Problem)object.orElse(null) ;   
    }

    public String deleteProblem(Integer id){
        Optional<Problem> findDeletePost = problemRepository.findById(id);

        Problem deleteProblem= Optionalto(findDeletePost);

        problemRepository.delete(deleteProblem);

        return "delete succescs";
    }

}

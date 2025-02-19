package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repository.ProblemRepository;
import com.example.backend.entity.*;
import java.util.List;
import java.util.Optional;
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
    
    public void addProblem (AddProblemDto problemform){
        //저장하기(dtd), 새로운 객체 생성 해서 저장
        Problem newProblem = new Problem();
        newProblem.setTitle(problemform.getTitle());
        newProblem.setDescription(problemform.getDescription());
        newProblem.setType(problemform.getType());
        problemRepository.save(newProblem);

    }

}

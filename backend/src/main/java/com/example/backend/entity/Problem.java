package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
//import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@Setter
@Table(name = "problems")

public class Problem {
    //한정자 자료형 이름 (변수선언)
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id; 

    @Column
    private String title;

    @Column
    private String description;

    //@Enumerated(value = EnumType.ORDINAL)
  
    @Column
    private String type;
  

    @CreationTimestamp
    @Column
    private Timestamp created_at;

    @UpdateTimestamp
    @Column
    private Timestamp updated_at;
    
}



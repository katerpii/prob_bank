package com.example.backend.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="board")    
public class CommunityDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Integer board_id;
    
    @Column(nullable=false,length=255) // NOT NULL, 길이 255 설정 
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable =false,length=255)
    private String author;

    @Column(name="user_id")
    private Integer user_id;

    @Column(name= "create_date",updatable = false) // 기본값 CURRENT_TIMESTAMP , 수정 불가 
    private LocalDateTime create_date; // localdatetime이 db에 CURRENT_TIMESTAMP 역할

    @Column(name = "updated_date")
    private LocalDateTime updated_date;


}

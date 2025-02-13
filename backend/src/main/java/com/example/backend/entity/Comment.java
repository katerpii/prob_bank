package com.example.backend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Data
@Entity
@Table(name="comment")
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer comment_id;

    @ManyToOne
    @JoinColumn(name="board_id", referencedColumnName = "board_id")
    private Community board_id;

    @ManyToOne
    @JoinColumn(name= "comment_author", referencedColumnName="user_email")
    private User commentAuthor;

    @Column(name="content") 
    private String content;
    
    @Column(name="created_at")
    @CreationTimestamp
    private LocalDateTime create_at;

    @Column(name="updated_at")
    @UpdateTimestamp
    private LocalDateTime update_at;
    
}

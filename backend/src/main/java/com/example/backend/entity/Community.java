package com.example.backend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;



@Entity
@Data
@Table(name="board")
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer board_id;

    @Column(name="title",length=255)
    private String title;

    @Column(name="author",length=255)
    private String author;

    @Column(name="content")
    private String content;

    @Column(name="create_date")
    @CreationTimestamp
    private LocalDateTime create_date;
    
    @UpdateTimestamp
    @Column(name="updated_date")
    private LocalDateTime updated_date;
}

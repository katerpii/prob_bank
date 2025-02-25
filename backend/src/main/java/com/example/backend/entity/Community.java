package com.example.backend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="board")
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer board_id;

    @Column(name="title",length=255)
    private String title;

    @ManyToOne
    @JoinColumn(name="author", referencedColumnName="user_email")
    private User author;

    @Column(name="content")
    private String content;

    @Column(name="create_date")
    @CreationTimestamp
    private LocalDateTime create_date;
    
    @Column(name="updated",columnDefinition = "boolean default false")
    private boolean updated;
}

// package com.example.backend.entity;

// import java.time.LocalDateTime;

// import org.hibernate.annotations.CreationTimestamp;
// import org.hibernate.annotations.UpdateTimestamp;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import lombok.Data;

// @Data
// @Entity
// public class Coment {

//     @Id
//     @GeneratedValue(strategy =GenerationType.AUTO)
//     private Integer coment_id;

//     // 외래키
//     @ManyToOne
//     @JoinColumn(name="board_id")
//     private Community board_id;

//     @ManyToOne
//     @JoinColumn(referencedColumnName="userEmail")
//     private User comentAuthor;

//     @Column(name="content") 
//     private String content;
    
//     @Column(name="created_at")
//     @CreationTimestamp
//     private LocalDateTime create_at;

//     @Column(name="updated_at")
//     @UpdateTimestamp
//     private LocalDateTime update_at;
    
// }

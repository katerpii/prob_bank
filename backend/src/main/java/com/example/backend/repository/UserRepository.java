package com.example.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.User;

// DB와 상호작용하는 기능적 method들을 정의 (public interface) (CLUD)
// findByUserEmail은 DB에서 이메일 정보를 기반으로 유저 정보를 찾아냄 
// -> SELECT * FROM User WHERE user_email 

// 비지니스 로직 없음!! 데이터 처리의 기능적 부분을 정의하는 모듈 (서비스 계층에서 해당 모듈에 의존하여 데이터 처리를 수행함)
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUseremail(String useremail);

} 
package com.example.backend.dto.communityDto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 프론트 단에서 author(User 객체) 받아서 이메일 꺼내쓰기보단(CommunityPage.js line 109)
// 백엔드에서 reponse 전용 AllPostViewDto를 따로 설정해서 응답하는 방식이 여러모로 좋을 듯 한데 어렵넹.. 
// 흠냐.. 일단 기존 방식대로 전체 조회는 List<Community> allpost 반환으로 냅뒀는데 이건 킵하던지 삭제하던지 동준님 맘대로 
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AllPostViewDto {
    private String title;
    private String author;
    private LocalDateTime createdAt;
}

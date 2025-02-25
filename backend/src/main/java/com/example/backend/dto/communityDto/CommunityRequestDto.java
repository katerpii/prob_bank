package com.example.backend.dto.communityDto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// NUll 인 필드는 자동으로 json 반환에서 제외
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommunityRequestDto {
    private Integer board_id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime create_At;
    private boolean updated;
}
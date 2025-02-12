package com.example.backend.dto.userDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JoinRequestDto {
    private String email;
    private String password;
    private String name;
}

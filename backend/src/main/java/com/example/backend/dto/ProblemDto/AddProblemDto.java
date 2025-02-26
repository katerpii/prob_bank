package com.example.backend.dto.ProblemDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddProblemDto {
    private String title;
    private String description;
    private String type;
}
package com.hihi.square.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserFindIdResponseDto {
    private Integer statusCode;
    private String message;
    private String uid;
}

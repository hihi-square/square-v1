package com.hihi.square.domain.user.dto.response;

import com.hihi.square.domain.user.entity.UserRankType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserMypageResponseDto {
    private String userProfileThumb;
    private UserRankType rank;
    private Integer point;
}

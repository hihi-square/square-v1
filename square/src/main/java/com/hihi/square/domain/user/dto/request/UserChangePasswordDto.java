package com.hihi.square.domain.user.dto.request;

import lombok.Data;

@Data
public class UserChangePasswordDto {
    private String oldPassword;
    private String newPassword;
}

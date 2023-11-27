package com.hihi.square.domain.store.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class ScsRegisterRequestDto {
    @NotEmpty
    protected Integer usrId;
    @NotEmpty
    protected Integer scbId;
}

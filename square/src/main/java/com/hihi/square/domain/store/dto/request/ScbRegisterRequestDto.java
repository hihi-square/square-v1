package com.hihi.square.domain.store.dto.request;

import com.hihi.square.domain.store.entity.StoreCategoryBig;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@Data
public class ScbRegisterRequestDto {
    @NotEmpty
    protected String name;

    public StoreCategoryBig toEntity() {
        return StoreCategoryBig.builder()
                .name(name)
                .createdAt(LocalDateTime.now())
                .build();
    }
}

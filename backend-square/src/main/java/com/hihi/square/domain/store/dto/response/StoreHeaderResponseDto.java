package com.hihi.square.domain.store.dto.response;

import com.hihi.square.domain.store.entity.BankType;
import lombok.Builder;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@Builder
public class StoreHeaderResponseDto {
    private String storeName;
    private String storePhone;

    // emd address 정보
    private Integer aemId;
    private String sidoName;
    private String dongName;
    private String siggName;

    // 상세 주소 with emdAddress
    private String address;
    private String content;
    @Enumerated(EnumType.STRING)
    private BankType bank;
    private String account;
    private String logo;
    private Boolean isOpened;
    private Float latitude;
    private Float longitude;
    private String banner;
}

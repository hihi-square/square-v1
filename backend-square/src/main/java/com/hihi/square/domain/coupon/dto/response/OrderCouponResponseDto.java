package com.hihi.square.domain.coupon.dto.response;

import com.hihi.square.domain.coupon.entity.DiscountType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderCouponResponseDto {

    private Integer uicId;
    private String name;
    private String content;
    private LocalDateTime expiredAt;
    private DiscountType discountType;
    private Float rate;
    private Integer minOrderPrice;
    private Integer maxDiscountPrice;
    private Boolean isAvailable;
}

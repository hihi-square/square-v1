package com.hihi.square.domain.point.dto.request;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.user.entity.Customer;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PointRegisterReqeustDto {

    Order order;
    Customer customer;
    Long amount;
    LocalDateTime createdAt;
    Integer type;
}

package com.hihi.square.domain.point.dto.request;

import com.hihi.square.domain.user.entity.Customer;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PointRegisterReqeustDto {

    Integer ordId;
    Customer customer;
    Long amount;
    Integer type;
}

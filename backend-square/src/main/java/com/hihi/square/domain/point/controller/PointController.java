package com.hihi.square.domain.point.controller;

import com.hihi.square.domain.point.dto.response.PointInfoResponseDto;
import com.hihi.square.domain.point.service.PointService;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/point")
@RequiredArgsConstructor
public class PointController {

    private final UserService userService;
    private final PointService pointService;
    
    // 사용자 포인트 내역 보기
    @Transactional
    @GetMapping
    public ResponseEntity<?> findAllPoint(Authentication authentication) {
        String uid = authentication.getName();
        Customer customer = (Customer)userService.findByUid(uid).get();
        PointInfoResponseDto response = pointService.getPointInfo(customer);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

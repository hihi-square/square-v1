package com.hihi.square.domain.sale.controller;

import com.hihi.square.domain.sale.dto.request.SaleCreateRequestDto;
import com.hihi.square.domain.sale.service.SaleService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/store/sale")
@RequiredArgsConstructor
public class SaleController {

    private final UserService userService;
    private final SaleService saleService;

    @PostMapping
    public ResponseEntity<?> createSale(Authentication authentication, @RequestBody @Valid SaleCreateRequestDto request) {
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        if (!(user instanceof Store)){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NO_AUTHORIZED"), HttpStatus.BAD_REQUEST);
        }
        saleService.createSale(request);
        return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS_CREATE").build(), HttpStatus.CREATED);
    }

}

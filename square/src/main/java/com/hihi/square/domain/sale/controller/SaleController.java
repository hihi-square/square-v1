package com.hihi.square.domain.sale.controller;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.service.MenuService;
import com.hihi.square.domain.sale.dto.request.SaleCreateRequestDto;
import com.hihi.square.domain.sale.dto.request.SaleMenuFormDto;
import com.hihi.square.domain.sale.dto.request.SaleUpdateRequestDto;
import com.hihi.square.domain.sale.dto.response.StoreAllSaleResponseDto;
import com.hihi.square.domain.sale.dto.response.StoreSaleDetailDto;
import com.hihi.square.domain.sale.dto.response.StoreSaleDetailResponseDto;
import com.hihi.square.domain.sale.dto.response.StoreSaleDto;
import com.hihi.square.domain.sale.entity.Sale;
import com.hihi.square.domain.sale.service.SaleService;
import com.hihi.square.domain.store.dto.response.EmdStoreCouponSaleDto;
import com.hihi.square.domain.store.dto.response.EmdStoreCouponSaleResponseDto;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.EmdAddressService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
public class SaleController {

    private final UserService userService;
    private final SaleService saleService;
    private final MenuService menuService;
    private final EmdAddressService emdAddressService;

    // 세일 등록
    @PostMapping("/sale")
    public ResponseEntity<?> createSale(Authentication authentication, @RequestBody @Valid SaleCreateRequestDto request) {
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        if (!(user instanceof Store)){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NO_AUTHORIZED").build(), HttpStatus.BAD_REQUEST);
        }
        // 선택한 메뉴가 모두 해당 가게의 메뉴인지 확인
        for(SaleMenuFormDto m : request.getMenus()){
            Menu menu = menuService.findById(m.getMenuId());
            if (menu.getUser().getUsrId() != user.getUsrId()){
                return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("CONTAIN_NO_AUTHORIZED_MENU").build(), HttpStatus.BAD_REQUEST);
            }
        }
        saleService.createSale(request, (Store) user);
        return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS_CREATE").build(), HttpStatus.CREATED);
    }

    // 세일 종료
    @PostMapping("/sale/{saleId}")
    public ResponseEntity<?> finishSale(Authentication authentication, @PathVariable Integer saleId){
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        Optional<Sale> optionalSale = saleService.findById(saleId);
        if (!optionalSale.isPresent()) {
            return new ResponseEntity<>(CommonResponseDto.builder().message("BAD_SALE_ID").statusCode(400).build(), HttpStatus.BAD_REQUEST);
        }
        Sale sale = optionalSale.get();
        if (user.getUsrId() != sale.getStore().getUsrId()){
            return new ResponseEntity<>(CommonResponseDto.builder().message("NO_AUTHORIZE").statusCode(400).build(), HttpStatus.BAD_REQUEST);
        }
        saleService.finishSale(sale);
        return new ResponseEntity<>(CommonResponseDto.builder().statusCode(200).message("SUCCESS_FINISH_SALE").build(), HttpStatus.OK);
    }
    
    // 내 가게의 전체 세일 개요 확인
    @GetMapping("/sales")
    public ResponseEntity<?> getMyAllSale(Authentication authentication){
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        if (!(user instanceof Store)){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NO_AUTHORIZED").build(), HttpStatus.BAD_REQUEST);
        }
        List<StoreSaleDto> result = saleService.getStoreAllSale((Store)user);
        if (result.isEmpty()){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(200).message("NO_SALE").build(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(StoreAllSaleResponseDto.builder().statusCode(200).message("SUCCESS").sales(result).build(), HttpStatus.OK);
        }
    }

    // 어떤 가게의 진행중인 세일 가져오기
    @GetMapping("/sales/{id}")
    public ResponseEntity<?> getStoreAllSale(@PathVariable("id") Integer storeId){
        Optional<User> optionalUser = userService.findByUsrId(storeId);
        if (!optionalUser.isPresent()){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NOT_EXISTS_STORE").build(), HttpStatus.BAD_REQUEST);
        }
        User user = optionalUser.get();
        if (!(user instanceof Store)){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NO_AUTHORIZED").build(), HttpStatus.BAD_REQUEST);
        }
        List<StoreSaleDto> result = saleService.getStoreInProgressSales((Store) user);
        if (result.isEmpty()){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(200).message("NO_SALE").build(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(StoreAllSaleResponseDto.builder().statusCode(200).message("SUCCESS").sales(result).build(), HttpStatus.OK);
        }
    }

    // 세일 삭제
    @DeleteMapping("/sale/{id}")
    public ResponseEntity<CommonResponseDto> deleteSale(Authentication authentication, @PathVariable("id") Integer saleId){
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        // 로그인 회원이 가게 회원인지 확인
        if (!(user instanceof Store)){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NO_AUTHORIZED").build(), HttpStatus.BAD_REQUEST);
        }
        Optional<Sale> optionalSale = saleService.findById(saleId);
        // 세일이 존재하는지 확인
        if (!optionalSale.isPresent()){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_SALE_ID").build(), HttpStatus.BAD_REQUEST);
        }
        Sale sale = optionalSale.get();
        // 로그인한 회원의 세일인지 확인
        if (user.getUsrId() != sale.getStore().getUsrId()){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NO_AUTHORIZED_TO_DELETE").build(), HttpStatus.BAD_REQUEST);
        }
        saleService.deleteSale(sale);
        return new ResponseEntity<>(CommonResponseDto.builder().statusCode(200).message("SUCCESS_DELETE_SALE").build(), HttpStatus.OK);
    }

    // 세일 수정
    @PatchMapping("/sale")
    public ResponseEntity<CommonResponseDto> updateSale(Authentication authentication, @RequestBody @Valid SaleUpdateRequestDto request) {
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        // 로그인 회원이 가게 회원인지 확인
        if (!(user instanceof Store)){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NO_AUTHORIZED").build(), HttpStatus.BAD_REQUEST);
        }
        Optional<Sale> optionalSale = saleService.findById(request.getSalId());
        // 세일이 존재하는지 확인
        if (!optionalSale.isPresent()){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_SALE_ID").build(), HttpStatus.BAD_REQUEST);
        }
        Sale sale = optionalSale.get();
        // 로그인한 회원의 세일인지 확인
        if (user.getUsrId() != sale.getStore().getUsrId()){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NO_AUTHORIZED_TO_UPDATE").build(), HttpStatus.BAD_REQUEST);
        }
        // 선택한 메뉴가 모두 해당 가게의 메뉴인지 확인
        for(SaleMenuFormDto m : request.getMenus()){
            Menu menu = menuService.findById(m.getMenuId());
            if (menu.getUser().getUsrId() != user.getUsrId()){
                return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("CONTAIN_NO_AUTHORIZED_MENU").build(), HttpStatus.BAD_REQUEST);
            }
        }
        saleService.updateSale(sale, request);
        return new ResponseEntity<>(CommonResponseDto.builder().statusCode(200).message("SUCCESS_UPDATE_SALE").build(), HttpStatus.OK);
    }
    // 세일 디테일
    @GetMapping("/sale/{id}")
    public ResponseEntity<?> getSaleDetail(@PathVariable("id") Integer saleId){
        Optional<Sale> optionalSale = saleService.findById(saleId);
        if (!optionalSale.isPresent()){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_SALE_ID").build(), HttpStatus.BAD_REQUEST);
        }
        Sale sale = optionalSale.get();
        StoreSaleDetailDto result = saleService.getSaleDetail(sale);
        return new ResponseEntity<>(StoreSaleDetailResponseDto.builder().sale(result).message("SUCCESS").statusCode(200).build(), HttpStatus.OK);
    }

    // 읍면동 + 현재 진행중인 세일이 있는 가게 리스트
    @GetMapping("/sale/emd/{id}")
    public ResponseEntity<?> getEmdSaleList(@PathVariable("id") Integer emdId) {
        Optional<EmdAddress> emdAddressOptional = emdAddressService.findById(emdId);
        if (emdAddressOptional.isEmpty()){
            return new ResponseEntity<>(CommonResponseDto.builder().message("INVALID_EMD_ID").statusCode(400).build(), HttpStatus.BAD_REQUEST);
        }
        EmdAddress emdAddress = emdAddressOptional.get();
        List<EmdStoreCouponSaleDto> result = saleService.findByEmdAddressWithProgressSale(emdAddress);
        return new ResponseEntity(EmdStoreCouponSaleResponseDto.builder().statusCode(200).stores(result).build(), HttpStatus.OK);
    }

    // 읍면동 + 현재 진행중인 세일 + 쿠폰이 있는 가게 리스트
    @GetMapping("/sale/coupon/emd/{id}")
    public ResponseEntity<?> getEmdSaleCouponList(@PathVariable("id") Integer emdId) {
        Optional<EmdAddress> emdAddressOptional = emdAddressService.findById(emdId);
        if (emdAddressOptional.isEmpty()){
            return new ResponseEntity<>(CommonResponseDto.builder().message("INVALID_EMD_ID").statusCode(400).build(), HttpStatus.BAD_REQUEST);
        }
        EmdAddress emdAddress = emdAddressOptional.get();
        List<EmdStoreCouponSaleDto> result = saleService.findByEmdAddressWithProgressSaleAndAvailableCoupon(emdAddress);
        return new ResponseEntity(EmdStoreCouponSaleResponseDto.builder().statusCode(200).stores(result).build(), HttpStatus.OK);
    }
}

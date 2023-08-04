package com.hihi.square.domain.sale.controller;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.service.MenuService;
import com.hihi.square.domain.sale.dto.request.SaleCreateRequestDto;
import com.hihi.square.domain.sale.dto.response.StoreAllSaleResponseDto;
import com.hihi.square.domain.sale.dto.response.StoreSaleDto;
import com.hihi.square.domain.sale.entity.Sale;
import com.hihi.square.domain.sale.service.SaleService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
public class SaleController {

    private final UserService userService;
    private final SaleService saleService;
    private final MenuService menuService;

    // 세일 등록
    @PostMapping("/sale")
    public ResponseEntity<?> createSale(Authentication authentication, @RequestBody @Valid SaleCreateRequestDto request) {
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        if (!(user instanceof Store)){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NO_AUTHORIZED").build(), HttpStatus.BAD_REQUEST);
        }
        List<Menu> menuList = new ArrayList<>();
        // 선택한 메뉴가 모두 해당 가게의 메뉴인지 확인
        for(Long menId : request.getMenus()){
            Menu menu = menuService.findById(menId);
            if (menu.getUser().getUsrId() != user.getUsrId()){
                return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("CONTAIN_NO_AUTHORIZED_MENU").build(), HttpStatus.BAD_REQUEST);
            }
            menuList.add(menu);
        }
        saleService.createSale(request, menuList, user);
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
        if (user.getUsrId() != sale.getUser().getUsrId()){
            return new ResponseEntity<>(CommonResponseDto.builder().message("NO_AUTHORIZE").statusCode(400).build(), HttpStatus.BAD_REQUEST);
        }
        saleService.finishSale(sale);
        return new ResponseEntity<>(CommonResponseDto.builder().statusCode(200).message("SUCCESS_FINISH_SALE").build(), HttpStatus.OK);
    }
    
    // 내 가게의 전체 세일 개요 확인
    @GetMapping("/sales")
    public ResponseEntity<?> getStoreAllSale(Authentication authentication){
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        if (!(user instanceof Store)){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NO_AUTHORIZED").build(), HttpStatus.BAD_REQUEST);
        }
        List<StoreSaleDto> result = saleService.getStoreAllSale(user);
        if (result.size() == 0){
            return new ResponseEntity<>(CommonResponseDto.builder().statusCode(204).message("NO_SALE").build(), HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(StoreAllSaleResponseDto.builder().statusCode(200).message("SUCCESS").sales(result).build(), HttpStatus.OK);
        }
    }
}

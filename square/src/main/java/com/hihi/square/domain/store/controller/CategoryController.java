package com.hihi.square.domain.store.controller;

import com.hihi.square.domain.store.dto.request.ScbRegisterRequestDto;
import com.hihi.square.domain.store.dto.request.ScbRegisterRequestDto;
import com.hihi.square.domain.store.dto.request.ScbUpdateRequestDto;
import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.store.repository.CategoryRepository;
import com.hihi.square.domain.store.service.CategoryService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/scb")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // 카테고리 대분류 다 가져오기
    @GetMapping
    public ResponseEntity<?> selectAll() throws SQLException {
        List< StoreCategoryBig> categories = categoryService.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    // 카테고리 등록
    @PostMapping
    public ResponseEntity<CommonResponseDto> registerBigCategory(@RequestBody @Valid ScbRegisterRequestDto request) {
        StoreCategoryBig storeCategoryBig = request.toEntity();
        CommonResponseDto response = CommonResponseDto.builder()
                .statusCode(201)
                .message("REGISTER_SUCCESS")
                .build();
        if(categoryService.validateDuplicateName(storeCategoryBig.getName())) {
            response.setMessage("ALREADY_EXISTS_CATEGORY_NAME");
            response.setStatusCode(409);
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        categoryService.save(storeCategoryBig);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CommonResponseDto> deleteBigCategory(@PathVariable Integer id) {
        CommonResponseDto response = CommonResponseDto.builder()
                .statusCode(200)
                .message("SUCCESSFULLY_DELETED")
                .build();
        if(categoryService.findById(id).isEmpty()){
            response.setStatusCode(409);
            response.setMessage("NOT_EXISTED_CATEGORY");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }
        categoryService.deleteById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // id 로 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> selectById(@PathVariable Integer id) {
        StoreCategoryBig category = categoryService.findById(id).get();
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    // 카테고리 수정
    @PatchMapping("/{id}")
    public ResponseEntity<CommonResponseDto> updateCategoryInfo(@PathVariable Integer id, @RequestBody ScbUpdateRequestDto request) {
        CommonResponseDto response = CommonResponseDto.builder()
                .statusCode(200)
                .message("UPDATE_SUCCESS")
                .build();
        if(categoryService.validateDuplicateName(request.getName())) {
            response.setMessage("ALREADY_EXISTS_CATEGORY_NAME");
            response.setStatusCode(409);
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }
        StoreCategoryBig storeCategoryBig = categoryService.findById(id).get();
        categoryService.updateCategoryBig(storeCategoryBig, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

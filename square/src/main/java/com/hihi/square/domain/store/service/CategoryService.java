package com.hihi.square.domain.store.service;

import com.hihi.square.domain.store.dto.request.ScbUpdateRequestDto;
import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.store.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // 대분류 카테고리 저장
    @Transactional
    public void save(StoreCategoryBig storeCategoryBig) {
        categoryRepository.save(storeCategoryBig);
    }

    // 카테고리 삭제
    @Transactional
    public void deleteById(Integer id) {
        categoryRepository.deleteById(id);
    }

    // 카테고리 전체 조회
    @Transactional(readOnly = true)
    public List<StoreCategoryBig> findAll() {
        return categoryRepository.findAll();
    }

    // 카테고리 이름 중복 조회
    public boolean validateDuplicateName(String name) {
        Optional<StoreCategoryBig> category = categoryRepository.findByName(name);
        return category.isPresent();
    }

    // 카테고리 상세 조회 (아이디로 찾기)
    public Optional<StoreCategoryBig> findById(Integer id) {return categoryRepository.findById(id);}

    // 카테고리 수정
    @Transactional
    public void updateCategoryBig(StoreCategoryBig storeCategoryBig, ScbUpdateRequestDto request) {
        storeCategoryBig.updateScbCategory(request);
        categoryRepository.save(storeCategoryBig);
    }
}

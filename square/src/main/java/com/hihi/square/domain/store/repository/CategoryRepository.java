package com.hihi.square.domain.store.repository;

import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.store.entity.StoreCategorySelected;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<StoreCategoryBig, Integer> {

    // 카테고리 등록
    // 카테고리 삭제
    // 카테고리 수정
    // 카테고리 조회

    // 카테고리 이름 조회
    public Optional<StoreCategoryBig> findByName(String name);

}

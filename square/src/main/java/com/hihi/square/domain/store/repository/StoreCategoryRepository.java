package com.hihi.square.domain.store.repository;

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.store.entity.StoreCategorySelected;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoreCategoryRepository extends JpaRepository<StoreCategorySelected, Integer> {
    // 객체 전부 조회
    // 객체 삭제
    // 객체 수정
    // 객체 등록
    // 앞으로 그냥 수정 말고 삭제후 재등록으로 하자

    List<StoreCategorySelected> findByStoreCategoryBig(StoreCategoryBig storeCategoryBig);

    List<StoreCategorySelected> findByStore(Store store);

    Optional<StoreCategorySelected> findByStoreAndStoreCategoryBig(Store store, StoreCategoryBig storeCategoryBig);

}

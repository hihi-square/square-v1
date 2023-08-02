package com.hihi.square.domain.store.service;

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.store.entity.StoreCategorySelected;
import com.hihi.square.domain.store.repository.StoreCategoryRepository;
import com.hihi.square.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class StoreCategoryService {

    private final StoreCategoryRepository storeCategoryRepository;
    private final StoreRepository storeRepository;

    // 카테고리에 의해 가게 정보 다 찾기
    public List<StoreCategorySelected> findByStoreCategoryBig(StoreCategoryBig storeCategoryBig) {
        return storeCategoryRepository.findByStoreCategoryBig(storeCategoryBig);
    }

    // 가게 정보에 의해 등록된 카테고리 가져오기
    public List<StoreCategorySelected> findByStore(Store store) {
        return storeCategoryRepository.findByStore(store);
    }

    // 가게 카테고리 (대분류) 등록

    // 가게 카테고리 삭제

    // 가게 카테고리 수정 -> 근데 이건 없애도 될듯
}

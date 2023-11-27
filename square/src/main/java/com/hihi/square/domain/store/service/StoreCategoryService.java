package com.hihi.square.domain.store.service;

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.store.entity.StoreCategorySelected;
import com.hihi.square.domain.store.repository.StoreCategoryRepository;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.user.entity.EmdAddress;

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
    private final CategoryService categoryService;

    // 가게 정보에 의해 등록된 카테고리 가져오기

    @Transactional
    // 카테고리에 의해 가게 정보 다 찾기
    public List<StoreCategorySelected> findByStoreCategoryBig(StoreCategoryBig storeCategoryBig) {
        return storeCategoryRepository.findByStoreCategoryBig(storeCategoryBig);
    }

    @Transactional(readOnly = true)
    public List<StoreCategorySelected> findByStore(Store store) {
        return storeCategoryRepository.findByStore(store);
    }

    public Integer countByStore(Store store) {
        return storeCategoryRepository.countByStore(store);
    }
    // 가게 카테고리 중복 확인 ( 가게 아이디, 카테고리아이디)
    @Transactional
    public boolean validateDuplicateStoreCategory(Store store, StoreCategoryBig storeCategoryBig) {
        Optional<StoreCategorySelected> storeCategory = storeCategoryRepository.findByStoreAndStoreCategoryBig(store, storeCategoryBig);
        return storeCategory.isPresent();
    }

    // 가게 카테고리 (대분류) 등록
    @Transactional
    public void save(Store store, StoreCategoryBig storeCategoryBig){
        StoreCategorySelected storeCategorySelected = StoreCategorySelected.builder()
                .store(store)
                .storeCategoryBig(storeCategoryBig)
                .build();
        storeCategoryRepository.save(storeCategorySelected);
    }

    // 가게 카테고리 삭제
    @Transactional
    public void deleteById(Integer id) {
        storeCategoryRepository.deleteById(id);
    }

    @Transactional
    public Optional<StoreCategorySelected> findById(Integer id) {
        return storeCategoryRepository.findById(id);
    }

    // 가게 카테고리 수정 -> 근데 이건 없애도 될듯
}

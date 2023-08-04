package com.hihi.square.domain.sale.service;

import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.sale.dto.request.SaleCreateRequestDto;
import com.hihi.square.domain.sale.entity.Sale;
import com.hihi.square.domain.sale.entity.SaleMenu;
import com.hihi.square.domain.sale.repository.SaleMenuRepository;
import com.hihi.square.domain.sale.repository.SaleRepository;
import com.hihi.square.domain.user.entity.User;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SaleService {

    private final SaleRepository saleRepository;
    private final SaleMenuRepository saleMenuRepository;
    private final MenuRepository menuRepository;

    @Transactional
    public void createSale(SaleCreateRequestDto request, User user) {
        Sale sale = request.toEntity(user);
        saleRepository.save(sale);
        for(Long menId : request.getMenus()){
            saleMenuRepository.save(SaleMenu.builder()
                    .sale(sale)
                    .menu(menuRepository.findById(menId).get())
                    .build());
        }
    }
}

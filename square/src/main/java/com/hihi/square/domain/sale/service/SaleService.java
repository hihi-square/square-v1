package com.hihi.square.domain.sale.service;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.sale.dto.request.SaleCreateRequestDto;
import com.hihi.square.domain.sale.dto.request.SaleUpdateRequestDto;
import com.hihi.square.domain.sale.dto.response.MenuDto;
import com.hihi.square.domain.sale.dto.response.StoreSaleDetailDto;
import com.hihi.square.domain.sale.dto.response.StoreSaleDto;
import com.hihi.square.domain.sale.entity.Sale;
import com.hihi.square.domain.sale.entity.SaleMenu;
import com.hihi.square.domain.sale.repository.SaleMenuRepository;
import com.hihi.square.domain.sale.repository.SaleRepository;
import com.hihi.square.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SaleService {

    private final SaleRepository saleRepository;
    private final SaleMenuRepository saleMenuRepository;
    private final MenuRepository menuRepository;

    @Transactional
    public void createSale(SaleCreateRequestDto request, List<Menu> menus, User user) {
        Sale sale = request.toEntity(user);
        saleRepository.save(sale);
        for(Menu menu : menus){
            saleMenuRepository.save(SaleMenu.builder()
                    .sale(sale)
                    .menu(menu)
                    .build());
        }
    }

    public Optional<Sale> findById(Integer saleId) {
        return saleRepository.findById(saleId);
    }

    @Transactional
    public void finishSale(Sale sale) {
        sale.finishSale();
        saleRepository.save(sale);
    }

    public List<StoreSaleDto> getStoreAllSale(User user) {
        List<StoreSaleDto> result = new ArrayList<>();
        List<Sale> saleList = saleRepository.findAllByUser(user);
        for(Sale sale : saleList){
            result.add(StoreSaleDto.builder()
                    .id(sale.getId())
                            .name(sale.getName())
                            .finishedAt(sale.getFinishedAt())
                            .startedAt(sale.getStartedAt())
                            .realFinishedAt(sale.getRealFinishedAt())
                            .price(sale.getPrice())
                            .menuNumber(sale.getMenus().size())
                            .status(sale.getStatus())
                    .build());
        }
        return result;
    }

    public List<StoreSaleDto> getStoreInProgressSales(User user) {
        List<StoreSaleDto> result = new ArrayList<>();
        List<Sale> saleList = saleRepository.findAllInProgressSalesByUser(user, LocalDateTime.now());
        for(Sale sale : saleList){
            result.add(StoreSaleDto.builder()
                    .id(sale.getId())
                    .name(sale.getName())
                    .finishedAt(sale.getFinishedAt())
                    .startedAt(sale.getStartedAt())
                    .realFinishedAt(sale.getRealFinishedAt())
                    .price(sale.getPrice())
                    .menuNumber(sale.getMenus().size())
                    .status(sale.getStatus())
                    .build());
        }
        return result;
    }
    @Transactional
    public void deleteSale(Sale sale) {
        // 일단 세일메뉴에 있는 것들 삭제
        saleMenuRepository.deleteAllBySale(sale);
        saleRepository.delete(sale);
    }

    @Transactional
    public void updateSale(Sale sale, SaleUpdateRequestDto request, List<Menu> menus) {
        saleMenuRepository.deleteAllBySale(sale);
        for(Menu menu : menus){
            saleMenuRepository.save(SaleMenu.builder()
                    .sale(sale)
                    .menu(menu)
                    .build());
        }
        sale.updateSale(request);
        saleRepository.save(sale);

    }

    public StoreSaleDetailDto getSaleDetail(Sale sale) {
        List<MenuDto> menuDtos = new ArrayList<>();
        List<SaleMenu> menus = saleMenuRepository.findAllBySale(sale);
        for(SaleMenu saleMenu : menus){
            Menu m = saleMenu.getMenu();
            menuDtos.add(MenuDto.builder()
                            .menuId(m.getMenuId())
                            .name(m.getName())
                            .price(m.getPrice())
                            .signature(m.isSignature())
                            .popularity(m.isPopularity())
                            .status(m.getStatus())
                            .description(m.getDescription())
                            .sequence(m.getSequence())
                    .build());
        }
        return StoreSaleDetailDto.builder()
                .id(sale.getId())
                .name(sale.getName())
                .startedAt(sale.getStartedAt())
                .finishedAt(sale.getFinishedAt())
                .realFinishedAt(sale.getRealFinishedAt())
                .price(sale.getPrice())
                .status(sale.getStatus())
                .menus(menuDtos)
                .build();
    }
}

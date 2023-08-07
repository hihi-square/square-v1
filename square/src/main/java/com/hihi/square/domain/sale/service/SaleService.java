package com.hihi.square.domain.sale.service;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.sale.dto.request.SaleCreateRequestDto;
import com.hihi.square.domain.sale.dto.request.SaleMenuFormDto;
import com.hihi.square.domain.sale.dto.request.SaleUpdateRequestDto;
import com.hihi.square.domain.sale.dto.response.SaleMenuDto;
import com.hihi.square.domain.sale.dto.response.StoreSaleDetailDto;
import com.hihi.square.domain.sale.dto.response.StoreSaleDto;
import com.hihi.square.domain.sale.entity.Sale;
import com.hihi.square.domain.sale.entity.SaleMenu;
import com.hihi.square.domain.sale.repository.SaleMenuRepository;
import com.hihi.square.domain.sale.repository.SaleRepository;
import com.hihi.square.domain.store.dto.response.EmdStoreCouponSaleDto;
import com.hihi.square.domain.store.dto.response.StoreCategorySelectedDto;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.entity.StoreCategorySelected;
import com.hihi.square.domain.store.repository.StoreCategoryRepository;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.store.service.StoreService;
import com.hihi.square.domain.user.entity.EmdAddress;
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
    private final StoreRepository storeRepository;
    // private final StoreCategoryRepository storeCategoryRepository;
    private final StoreService storeService;

    @Transactional
    public void createSale(SaleCreateRequestDto request, Store store) {
        Sale sale = request.toEntity(store);
        saleRepository.save(sale);
        for(SaleMenuFormDto menu : request.getMenus()){
            saleMenuRepository.save(SaleMenu.builder()
                    .sale(sale)
                    .menu(menuRepository.findById(menu.getMenuId()).get())
                    .quantity(menu.getQuantity())
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

    public List<StoreSaleDto> getStoreAllSale(Store store) {
        List<StoreSaleDto> result = new ArrayList<>();
        List<Sale> saleList = saleRepository.findAllByStore(store);
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

    public List<StoreSaleDto> getStoreInProgressSales(Store store) {
        List<StoreSaleDto> result = new ArrayList<>();
        List<Sale> saleList = saleRepository.findAllInProgressSalesByUser(store, LocalDateTime.now());
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
    public void updateSale(Sale sale, SaleUpdateRequestDto request) {
        saleMenuRepository.deleteAllBySale(sale);
        for(SaleMenuFormDto menu : request.getMenus()){
            saleMenuRepository.save(SaleMenu.builder()
                    .sale(sale)
                    .menu(menuRepository.findById(menu.getMenuId()).get())
                    .quantity(menu.getQuantity())
                    .build());
        }
        sale.updateSale(request);
        saleRepository.save(sale);

    }

    public StoreSaleDetailDto getSaleDetail(Sale sale) {
        List<SaleMenuDto> saleMenuDtos = new ArrayList<>();
        List<SaleMenu> menus = saleMenuRepository.findAllBySale(sale);
        for(SaleMenu saleMenu : menus){
            Menu m = saleMenu.getMenu();
            saleMenuDtos.add(SaleMenuDto.builder()
                            .menuId(m.getMenuId())
                            .name(m.getName())
                            .price(m.getPrice())
                            .signature(m.isSignature())
                            .popularity(m.isPopularity())
                            .status(m.getStatus())
                            .description(m.getDescription())
                            .sequence(m.getSequence())
                            .quantity(saleMenu.getQuantity())
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
                .menus(saleMenuDtos)
                .build();
    }

	public List<EmdStoreCouponSaleDto> findByEmdAddressWithProgressSale(EmdAddress emdAddress) {
        List<Store> stores = storeRepository.findByEmdAddressAndHaveProgressSale(emdAddress, LocalDateTime.now());
        List<EmdStoreCouponSaleDto> result = storeService.storeToEmdStoreCouponSaleDto(stores);
        return result;
	}

    public List<EmdStoreCouponSaleDto> findByEmdAddressWithProgressSaleAndAvailableCoupon(EmdAddress emdAddress) {
        List<Store> stores = storeRepository.findByEmdAddressAndHaveProgressSaleAndAvailableCoupon(emdAddress, LocalDateTime.now());
        List<EmdStoreCouponSaleDto> result = storeService.storeToEmdStoreCouponSaleDto(stores);
        return result;
    }
}

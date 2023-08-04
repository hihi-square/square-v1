package com.hihi.square.domain.sale.repository;

import com.hihi.square.domain.sale.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.sale.entity.SaleMenu;

public interface SaleMenuRepository extends JpaRepository<SaleMenu, Integer> {
    void deleteAllBySale(Sale sale);
}

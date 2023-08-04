package com.hihi.square.domain.sale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.sale.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
}

package com.hihi.square.domain.sale.repository;

import com.hihi.square.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.sale.entity.Sale;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
    List<Sale> findAllByUser(User user);
}

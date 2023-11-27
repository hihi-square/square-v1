package com.hihi.square.domain.sale.repository;

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.sale.entity.Sale;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Integer> {

    @Query("select s from Sale s where s.store = :store and :now between s.startedAt and s.realFinishedAt")
    List<Sale> findAllInProgressSalesByUser(Store store, LocalDateTime now);

    List<Sale> findAllByStore(Store store);
}

package com.hihi.square.domain.sale.repository;

import com.hihi.square.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.sale.entity.Sale;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
    List<Sale> findAllByUser(User user);

    @Query("select s from Sale s where s.user = :user and :now between s.startedAt and s.realFinishedAt")
    List<Sale> findAllInProgressSalesByUser(User user, LocalDateTime now);
}

package com.hihi.square.domain.order.repository;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    Optional<Order> findById(Integer id);
    // 주문 조회 가게 별로

    List<Optional<Order>> findByCustomerOrderByCreatedAtDesc(Customer customer);

    List<Optional<Order>> findByStoreOrderByCreatedAtDesc(Store store);

    Integer countOrderByCustomerAndCreatedAtBetween(Customer customer, LocalDateTime start, LocalDateTime end);
}

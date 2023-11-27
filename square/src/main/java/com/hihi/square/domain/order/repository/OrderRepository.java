package com.hihi.square.domain.order.repository;

import com.hihi.square.domain.order.dto.response.OrderStatusCountDto;
import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    Optional<Order> findById(Integer id);
    // 주문 조회 가게 별로

    List<Optional<Order>> findByCustomerOrderByCreatedAtDesc(Customer customer);

    List<Optional<Order>> findByStoreOrderByCreatedAtDesc(Store store);

    Integer countOrderByCustomerAndCreatedAtBetween(Customer customer, LocalDateTime start, LocalDateTime end);

	@Query("SELECT NEW com.hihi.square.domain.order.dto.response.OrderStatusCountDto(o.status, COUNT(o)) FROM Order o WHERE o.customer = :customer GROUP BY o.status")
	List<OrderStatusCountDto> findPaymentAndOrderAcceptNumberByUser(@Param("customer") Customer customer);

}

package com.hihi.square.domain.point.repository;

import com.hihi.square.domain.point.entity.Point;
import com.hihi.square.domain.user.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PointRepository extends JpaRepository<Point, Integer> {

    List<Optional<Point>> findAllByCustomerOrderByCreatedAtDesc(Customer customer);
}

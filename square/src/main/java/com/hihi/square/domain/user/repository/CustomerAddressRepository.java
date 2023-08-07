package com.hihi.square.domain.user.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.CustomerAddress;
import com.hihi.square.domain.user.entity.User;

public interface CustomerAddressRepository extends JpaRepository<CustomerAddress, Integer> {
	List<CustomerAddress> findAllByCustomer(Customer customer);

	// List<CustomerAddress> findAllByCustomer(Customer customer);
}

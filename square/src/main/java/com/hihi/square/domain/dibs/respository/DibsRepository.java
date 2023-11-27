package com.hihi.square.domain.dibs.respository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.dibs.entity.Dibs;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;

public interface DibsRepository extends JpaRepository<Dibs, Integer> {

	// @Query("select d from Dibs d where d.customer = :customer and d.store = :store")
	Optional<Dibs> findByCustomerAndStore(Customer customer, Store store);

	List<Dibs> findByCustomer(Customer customer);

	List<Dibs> findCustomerByStore(Store store);

	Integer countByCustomer(Customer customer);
}

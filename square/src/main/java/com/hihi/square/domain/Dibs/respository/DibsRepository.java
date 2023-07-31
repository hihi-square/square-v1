package com.hihi.square.domain.Dibs.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hihi.square.domain.Dibs.entity.Dibs;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;

public interface DibsRepository extends JpaRepository<Dibs, Integer> {

	@Query("select d from Dibs d where d.customer.uid = :uid and d.store.uid = :storeId")
	Optional<Dibs> findByUidAndStoreId(String uid, String storeId);
	@Query("select d from Dibs d where d.customer = :customer and d.store = :store")
	Optional<Dibs> findByCustomerAndStore(Customer customer, Store store);
}

package com.hihi.square.domain.Dibs.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.Dibs.entity.Dibs;
import com.hihi.square.domain.Dibs.respository.DibsRepository;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DibsService {

	private final DibsRepository dibsRepository;

	public void dibStore(Customer customer, Store store) {
		dibsRepository.save(Dibs.builder().store(store).customer(customer).createdAt(LocalDateTime.now()).build());
	}

	public Optional<Dibs> getDib(Customer customer, Store store) {
		return dibsRepository.findByCustomerAndStore(customer, store);
	}

	public void dibCancel(Dibs dibs) {
		dibsRepository.delete(dibs);
	}
}

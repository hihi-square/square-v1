package com.hihi.square.domain.user.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.user.dto.request.CustomerAddressCreateRequestDto;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.repository.EmdAddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerAddressService {

	// private final EmdAddressRepository emdAddressRepository;
	//
	// @Transactional
	// public void deleteAddress(CustomerAddress customerAddress) {
	// 	customerAddressRepository.delete(customerAddress);
	// }
	//
	// @Transactional
	// public void addCustomerAddress(Customer customer, CustomerAddressCreateRequestDto request) {
	// 	Optional<EmdAddress> emd = emdAddressRepository.findByBCode(request.getBCode());
	// 	customerAddressRepository.save(CustomerAddress.builder()
	// 			.customer(customer)
	// 			.emdAddress(emd.get())
	// 			.createdAt(LocalDateTime.now())
	// 			.build()
	// 		);
	// }
	//
	// public List<CustomerAddress> findAllByCustomer(Customer customer) {
	// 	return customerAddressRepository.findAllByCustomer(customer);
	// }
	//
	// public Optional<CustomerAddress> findById(Integer customerAddressId) {
	// 	return customerAddressRepository.findById(customerAddressId);
	// }

}

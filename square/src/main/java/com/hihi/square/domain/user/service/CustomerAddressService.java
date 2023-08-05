package com.hihi.square.domain.user.service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.user.dto.request.CustomerAddressCreateRequestDto;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.CustomerAddress;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.repository.CustomerAddressRepository;
import com.hihi.square.domain.user.repository.EmdAddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerAddressService {

	private final CustomerAddressRepository customerAddressRepository;
	private final EmdAddressRepository emdAddressRepository;

	@Transactional
	public void addCustomerAddress(Customer customer, CustomerAddressCreateRequestDto request) {
		Optional<EmdAddress> emd = emdAddressRepository.findByNames(request.getSidoName(), request.getSiggName(), request.getEmdName());
		if (!emd.isPresent()) {
			emd = emdAddressRepository.findByLikeNames(request.getSidoName(), request.getSiggName(), request.getEmdName());
		}
		customerAddressRepository.save(CustomerAddress.builder()
				.customer(customer)
				.address(request.getAddress())
				.emdAddress(emd.get())
				.latitude(request.getLatitude())
				.longitude(request.getLongitude())
				.createdAt(LocalDateTime.now())
				.build()
			);
	}

	public List<CustomerAddress> findAllByCustomer(Customer customer) {
		return customerAddressRepository.findAllByCustomer(customer);
	}
}

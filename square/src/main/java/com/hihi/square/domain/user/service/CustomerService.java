package com.hihi.square.domain.user.service;

import com.hihi.square.domain.order.repository.OrderRepository;
import com.hihi.square.domain.order.service.OrderService;
import com.hihi.square.domain.user.dto.response.CustomerRankInfoResponseDto;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.UserRankType;
import com.hihi.square.domain.user.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class CustomerService {

	private final CustomerRepository customerRepository;
	private final PasswordEncoder passwordEncoder;
	private final OrderRepository orderRepository;

	@Transactional
	public void save(Customer customer){
		customer.passwordEncode(passwordEncoder);
		customerRepository.save(customer);
	}

	public String getRankName(UserRankType type) {
		switch (type) {
			case UR01:
				return "뚜벅이";
			case UR02:
				return "슝슝이";
			case UR03:
				return "씽씽이";
			case UR04:
				return "붕붕이";
		}
		return "뚜벅이";
	}

	public Integer getRankPercentage(UserRankType type) {
		switch (type) {
			case UR01:
				return 0;
			case UR02:
				return 1;
			case UR03:
				return 3;
			case UR04:
				return 5;
		}
		return 0;
	}

	public Integer getNextRankOrderLimit(UserRankType type) {
		switch (type) {
			case UR01:
				return 5;
			case UR02:
				return 15;
			case UR03:
				return 30;
		}
		return 0;
	}

	public String getNextRankName(UserRankType type) {
		switch (type) {
			case UR01:
				return "슝슝이";
			case UR02:
				return "씽씽이";
			case UR03:
				return "붕붕이";
		}
		return "뚜벅이";
	}

	public CustomerRankInfoResponseDto getRankInfo(Customer customer) {

		UserRankType type = customer.getRank();
		Integer orderCount = orderRepository.countOrderByCustomerAndCreatedAtBetween(customer, LocalDateTime.now().minusDays(30), LocalDateTime.now());

		if(type.equals(UserRankType.UR04)){
			CustomerRankInfoResponseDto response = CustomerRankInfoResponseDto.builder()
					.cusId(customer.getUsrId())
					.name(customer.getName())
					.rankName(getRankName(type))
					.percentage(getRankPercentage(type))
					.month(LocalDateTime.now().getMonthValue())
					.orderCount(orderCount)
					.build();
			return response;
		}

		CustomerRankInfoResponseDto response = CustomerRankInfoResponseDto.builder()
				.cusId(customer.getUsrId())
				.name(customer.getName())
				.rankName(getRankName(type))
				.percentage(getRankPercentage(type))
				.restOrder(getNextRankOrderLimit(type)-orderCount)
				.nextRankName(getNextRankName(type))
				.month(LocalDateTime.now().getMonthValue())
				.orderCount(orderCount)
				.build();
		return response;
	}
}

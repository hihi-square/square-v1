package com.hihi.square.domain.review.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.review.dto.request.ReviewUpdateRequestDto;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.global.BaseTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "review")
public class Review extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "orr_id")
	private Integer id;

	@JoinColumn(name = "sto_id")
	@ManyToOne
	private Store store;

	@JoinColumn(name = "ord_id")
	@ManyToOne
	private Order order;

	@JoinColumn(name = "usr_id")
	@ManyToOne
	private Customer customer;

	private Integer rating;
	private String content;

	@Enumerated(EnumType.STRING)
	private ReviewStatus status;

	public void updateReview(ReviewUpdateRequestDto request) {
		this.rating = request.getRating();
		this.content = request.getContent();
	}
}

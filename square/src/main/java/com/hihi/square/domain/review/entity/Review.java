package com.hihi.square.domain.review.entity;

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.review.dto.request.ReviewUpdateRequestDto;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="review")
public class Review extends BaseTime {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="orr_id")
	private Integer id;

	@JoinColumn(name = "sto_id")
	@ManyToOne
	private Store store;

	@JoinColumn(name = "odt_id")
	@ManyToOne
	private OrderDetail orderDetail;

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

package com.hihi.square.domain.order.entity;

import java.time.LocalDateTime;

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

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_detail")
public class OrderDetail {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "odt_id")
    private Integer odtId;

	@ManyToOne
	@JoinColumn(name = "ord_id")
	private Order order;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private Store store;

	@Column(name = "request_detail")
	private String requestDetail;

	@Column(name = "total_price")
	private Long totalPrice;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Enumerated(EnumType.STRING)
	private OrderStatus status;

}

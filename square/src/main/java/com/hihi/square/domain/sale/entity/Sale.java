package com.hihi.square.domain.sale.entity;

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.board.entity.Status;
import com.hihi.square.domain.sale.dto.request.SaleUpdateRequestDto;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sale")
public class Sale extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sal_id")
	private Integer id;
	private String name;
	@Column(name = "started_at")
	private LocalDateTime startedAt;
	@Column(name = "finished_at")
	private LocalDateTime finishedAt;
	@Column(name = "real_finished_at")
	private LocalDateTime realFinishedAt;
	private Integer price;
	@Enumerated(EnumType.STRING)
	private Status status;
	@ManyToOne
	@JoinColumn(name = "usr_id")
	private Store store;
	@OneToMany(mappedBy = "sale")
	private List<SaleMenu> menus = new ArrayList<>();

	public void finishSale() {
		this.realFinishedAt = LocalDateTime.now();
	}

	public void updateSale(SaleUpdateRequestDto request) {
		this.name = request.getName();
		this.startedAt = request.getStartAt();
		this.finishedAt = request.getFinishedAt();
		this.price = request.getPrice();
		this.status = request.getStatus();
	}
}

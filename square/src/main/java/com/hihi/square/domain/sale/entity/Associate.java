package com.hihi.square.domain.sale.entity;

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.board.entity.Status;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "associate")
public class Associate extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sac_id")
	private Integer sac_id;
	private String name;
	private String content;
	private Integer price;
	@Column(name = "state")
	private Status status; // 0이면 등록, 1이면 끝남
	@Column(name = "start_at")
	private LocalDateTime startAt;
	@Column(name = "end_at")
	private LocalDateTime endAt;
}

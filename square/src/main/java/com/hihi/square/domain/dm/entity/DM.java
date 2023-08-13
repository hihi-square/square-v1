package com.hihi.square.domain.dm.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "dm")
public class DM {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="dim_id")
	private Integer id;
	@JoinColumn(name="from_id")
	@ManyToOne
	private User fromUser;
	@JoinColumn(name="to_id")
	@ManyToOne
	private User toUser;
	@Column(name="send_at")
	private LocalDateTime sendAt;
	private String content;

}

package com.hihi.square.domain.dm.service;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.dm.entity.DM;
import com.hihi.square.domain.dm.repository.DMRepository;
import com.hihi.square.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DMService {

	private final DMRepository dmRepository;

	@Transactional
	public void writeDM(User user, User receiver, String content) {
		DM dm = DM.builder().fromUser(user).toUser(receiver).sendAt(LocalDateTime.now()).content(content).build();
		dmRepository.save(dm);
	}
}

package com.hihi.square.domain.dm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.dm.dto.request.DMRequestDto;
import com.hihi.square.domain.dm.entity.DM;
import com.hihi.square.domain.dm.repository.DMRepository;
import com.hihi.square.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DMService {

	private final DMRepository dmRepository;

	//받은 쪽지 목록 조회
	public List<DM> findGetMessageList(User user) {
		return dmRepository.findGetMessageList(user.getUsrId());
	}

	//보낸 쪽지 목록 조회
	public List<DM> findSendMessageList(User user) {
		return dmRepository.findSendMessageList(user.getUsrId());
	}

	//받은 쪽지 상세 조회
	public DM findGetMessageDetail(User user, Long dmId) {
		Optional<DM> dm = dmRepository.findGetMessageDetail(user.getUsrId(), dmId);
		//해당 번호의 쪽지가 없는 경우
		if (dm.isEmpty()) {
			return null;
		}

		//쪽지 읽음 처리
		dmRepository.changeIsRead(dmId);
		return dm.get();
	}

	//보낸 쪽지 상세 조회
	public DM findSendMessageDetail(User user, Long dmId) {
		Optional<DM> dm = dmRepository.findSendMessageDetail(user.getUsrId(), dmId);

		//해당 번호의 쪽지가 없는 경우
		if (dm.isEmpty()) {
			return null;
		}

		return dm.get();
	}

	//쪽지 보내기
	public DM sendMessage(DMRequestDto requestDto) {
		requestDto.setIsRead(false);
		DM dm = dmRepository.save(requestDto.toEntity());
		log.info("send dm : {}", dm);
		return dm;
	}

	//받은 쪽지 삭제
	// public DM deleteMessage(User user, Long dmId) {
	// 	Optional<DM> dm = dmRepository.findGetMessageDetail(user.getUsrId(), dmId);
	//
	// 	//해당 번호의 쪽지가 없는 경우
	// 	if (dm.isEmpty()) {
	// 		return null;
	// 	}
	//
	// 	return dm.get();
	// }

	//보낸 쪽지 삭제

	// @Transactional
	// public void writeDM(User user, User receiver, String content) {
	// 	DM dm = DM.builder().fromUser(user).toUser(receiver).sendAt(LocalDateTime.now()).content(content).build();
	// 	dmRepository.save(dm);
	// }
}

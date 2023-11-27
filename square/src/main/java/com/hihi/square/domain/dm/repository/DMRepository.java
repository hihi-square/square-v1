package com.hihi.square.domain.dm.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hihi.square.domain.dm.entity.DM;

public interface DMRepository extends JpaRepository<DM, Long> {
	//받은 쪽지 목록 조회
	@Query(value = "select * from dm where to_id=:usrId", nativeQuery = true)
	List<DM> findGetMessageList(@Param("usrId") Integer usrId);

	//보낸 쪽지 목록 조회
	@Query(value = "select * from dm where from_id=:usrId", nativeQuery = true)
	List<DM> findSendMessageList(@Param("usrId") Integer usrId);

	//받은 쪽지 상세 조회
	@Query(value = "select * from dm where to_id=:usrId and dmi_id=:dmId", nativeQuery = true)
	Optional<DM> findGetMessageDetail(@Param("usrId") Integer usrId, @Param("dmId") Long dmId);

	//보낸 쪽지 상세 조회
	@Query(value = "select * from dm where from_id=:usrId and dmi_id=:dmId", nativeQuery = true)
	Optional<DM> findSendMessageDetail(@Param("usrId") Integer usrId, @Param("dmId") Long dmId);

	//쪽지 보내기
	@Transactional
	DM save(DM dm);

	//쪽지 읽음 상태 처리
	@Transactional
	@Modifying
	@Query(value = "update dm set is_read=1 where dmi_id=:dmId", nativeQuery = true)
	void changeIsRead(@Param("dmId") Long dmId);

	// //받은 쪽지 삭제
	// @Transactional
	// @Query(value = "delete from dm where to_id=:usrId and id=:dmId", nativeQuery = true)
	// Optional<DM> deleteGetById(@Param("usrId") Integer usrId, @Param("dmId") Long dmId);
	//
	// //보낸 쪽지 삭제
	// @Query(value = "select * from where from_id=:usrId and id=:dmId", nativeQuery = true)
	// Optional<DM> deleteSendById(@Param("usrId") Integer usrId, @Param("dmId") Long dmId);
}

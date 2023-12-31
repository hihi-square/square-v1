package com.hihi.square.domain.image.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.image.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {
	List<Image> findAllByTypeAndConnectedIdOrderByOrder(String type, Integer connectedId);

	void deleteByTypeAndConnectedId(String type, Integer connectedId);

	List<Image> findAllByTypeAndConnectedId(String sno, Integer snoId);
}

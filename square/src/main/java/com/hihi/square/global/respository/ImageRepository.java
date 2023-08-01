package com.hihi.square.global.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.global.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {
	List<Image> findAllByTypeAndConnectedId(String sno, Integer snoId);
}

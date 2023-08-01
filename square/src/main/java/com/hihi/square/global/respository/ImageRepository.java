package com.hihi.square.global.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.global.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {
}

package com.hihi.square.domain.image.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.image.dto.response.ImageResponseDto;
import com.hihi.square.domain.image.entity.Image;
import com.hihi.square.domain.image.respository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

	private final ImageRepository imageRepository;

	public List<Image> getImageResponseList(String type, Integer connectedId){
		return imageRepository.findAllByTypeAndConnectedIdOrderByOrder(type, connectedId);
	}

}

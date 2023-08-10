package com.hihi.square.domain.user.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.service.EmdAddressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/emd")
@RequiredArgsConstructor
public class EmdAddressController {

	private final EmdAddressService emdAddressService;

	@GetMapping("/{admCode}/{depth}")
	public ResponseEntity getDepthEmdAddress(@PathVariable("admCode") Long admCode, @PathVariable("depth") Integer depth){
		EmdAddress emdAddress = emdAddressService.findByAdmCode(admCode);
		List<EmdAddress> emdAddressList = emdAddressService.getEmdAddressWithDepth(emdAddress.getAemId(), depth);
		List<String> result = new ArrayList<>();
		for(EmdAddress e : emdAddressList){
			result.add(e.getAdmCode().toString());
		}
		return new ResponseEntity(result, HttpStatus.OK);
	}
}

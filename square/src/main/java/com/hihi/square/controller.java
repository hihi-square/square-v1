package com.hihi.square;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class controller {
	@GetMapping
	public ResponseEntity<String> test(){
		System.out.println("merge test");
		return new ResponseEntity<>("성공 - b_soyeon. merge-version", HttpStatus.OK);
	}
}

package com.hihi.square;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class controller {
	@GetMapping("/api/v1")
	public ResponseEntity<String> test() {
		System.out.println("히히");
		return new ResponseEntity<String>("성공",HttpStatus.OK);
	}
}

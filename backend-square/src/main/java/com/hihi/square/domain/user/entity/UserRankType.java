package com.hihi.square.domain.user.entity;

import org.hibernate.loader.plan.exec.process.spi.ReturnReader;
import org.springframework.security.core.parameters.P;

public enum UserRankType {
	UR01, // 1단계 포인트 적립 없음 주문조건 없음
	UR02, // 2단계 포인트 적립 1프로, 월 5회 이상 주문시
	UR03, // 3단계 포인트 적립 3프로, 월 15회 이상 주문시
	UR04; // 4단계 포인트 적립 5프로, 월 30회 이상 주문시

}

package com.hihi.square.domain.order.entity;

public enum OrderStatus {
	REGISTERED, // 주문 등록 (아직 결제 완료 되지 않은 상태)
	PAYMENT_COMPLETE,  // 결제 완료 (사용자카드 결제 승인)
	PAYMENT_FAILED, // 결제 실패 (사용자카드 결제 실패)
	ORDER_ACCEPT,  // 가게 주문 수락
	ORDER_REJECT,  // 가게 주문 거절
	PICKUP_COMPLETE,
	COMPLETE, // 주문이 성공적으로 마무리 된 상태
	CANCELED // 장바구니에서 없애는 것이 아닌 주문이 정상적으로 처리 되지 못한 후에 주문 취소 할 경우

}

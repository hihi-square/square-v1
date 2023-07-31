package com.hihi.square.domain.order.entity;

public enum OrderStatus {
    SAVED,  // 장바구니에 저장됨
    CHECKED,  // checked 인 상태인 상세주문만 주문 할 수 있음
    COMPLETE, // 주문이 성공적으로 마무리 된 상태
    CANCELED // 장바구니에서 없애는 것이 아닌 주문이 정상적으로 처리 되지 못한 후에 주문 취소 할 경우

}

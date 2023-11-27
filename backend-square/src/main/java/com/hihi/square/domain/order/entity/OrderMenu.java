package com.hihi.square.domain.order.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="order_menu")
public class OrderMenu {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orm_id")
    private Integer ormId;

    @ManyToOne
    @JoinColumn(name = "ord_id")
    private Order order;

    @Column(name = "product_id")
    private Integer productId;
    // status type 에 따라 sevice에서 객체타입이 달라짐.. ㅠㅠ

    private Integer quantity;

    private Long price; // 개당 가격임

    @Enumerated(EnumType.STRING)
    private OrderMenuType type;

}

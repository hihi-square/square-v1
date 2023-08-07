package com.hihi.square.domain.order.entity;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.sale.entity.Sale;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class OrderMenu {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orm_id")
    private Integer ormId;

    @ManyToOne
    @JoinColumn(name = "odt_id")
    private OrderDetail orderDetail;

    @Column(name = "product_id")
    private Integer productId;
    // status type 에 따라 sevice에서 객체타입이 달라짐.. ㅠㅠ

    private Integer quantity;

    private Long price; // 개당 가격임

    @Enumerated(EnumType.STRING)
    private OrderMenuType type;

}

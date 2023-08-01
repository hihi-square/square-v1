package com.hihi.square.domain.order.entity;

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_detail")
@Getter @Setter
public class OrderDetail {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "odt_id")
    private Integer odtId;

    @ManyToOne
    @JoinColumn(name = "ord_id")
    private Order order;

    @ManyToOne
    @JoinColumn(referencedColumnName = "usr_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(referencedColumnName = "usr_id")
    private Store store;

    @Column(name = "total_price")
    private Integer totalPrice;

    private String requests;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name = "used_point")
    private Integer usedPoint;

}

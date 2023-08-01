package com.hihi.square.domain.order.entity;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class OrderMenu {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orm_id")
    private Integer ormId;

    @ManyToOne
    @JoinColumn(name = "odt_id")
    private OrderDetail orderDetail;

    @ManyToOne
    @JoinColumn(name = "men_id")
    private Menu menu;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "usr_id")
    private User user;


}

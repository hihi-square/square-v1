package com.hihi.square.domain.simple.entity;

import com.hihi.square.domain.menu.entity.Menu;
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
@Table(name = "simple")
public class Simple {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "men_id")
    private Menu menu;

    private Integer quantity;
    private Integer price;
    private String request;

    @Column(name = "use_point")
    private Integer usePoint;



}

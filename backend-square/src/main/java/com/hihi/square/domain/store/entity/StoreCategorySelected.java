package com.hihi.square.domain.store.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "store_category_selected")
public class StoreCategorySelected {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scs_id")
    private Integer scsId;

    @ManyToOne
    @JoinColumn(name = "scb_id")
    private StoreCategoryBig storeCategoryBig;

    @ManyToOne
    @JoinColumn(name = "usr_id")
    private Store store;

}

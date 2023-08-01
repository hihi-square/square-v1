package com.hihi.square.domain.store.entity;

import com.hihi.square.domain.store.dto.request.ScbUpdateRequestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "store_category_big")
public class StoreCategoryBig {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scb_id")
    private Integer scbId;

    private String name;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

//    @OneToMany(mappedBy = "storeCategoryBig")
//    private List<StoreCategorySelected> storeCategorySelectedList = new ArrayList<>();

    public void updateScbCategory(ScbUpdateRequestDto request) {
        this.name = request.getName();
    }
}

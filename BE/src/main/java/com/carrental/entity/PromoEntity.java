package com.carrental.entity;

import com.carrental.enums.StandardStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "promotion")
@Getter
@Setter
public class PromoEntity extends BaseEntity {
    private String title;
    private String content;

    @ElementCollection
    @CollectionTable(name = "contents")
    private List<String> contents;

    private int quantity;
    private double maxPrice;
    private double discountPercent;
    private StandardStatus status;
    @Column
    private Date startDate;
    @Column
    private Date endDate;
    
}

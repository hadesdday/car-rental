package com.carrental.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "car_rating")
@Getter
@Setter
public class CarRatingEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "car_id")
    private CarEntity car;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String name;
    private String content;
    private Double rating;
}

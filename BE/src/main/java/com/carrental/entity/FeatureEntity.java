package com.carrental.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "feature")
@Getter
@Setter
public class FeatureEntity extends BaseEntity {
    private String name;
    private String iconFilename;

    @ManyToOne
    @JoinTable(
            name = "car_feature",
            joinColumns = {@JoinColumn(name = "feature_id")},
            inverseJoinColumns = {@JoinColumn(name = "car_id")}
    )
    private CarEntity cars;
}


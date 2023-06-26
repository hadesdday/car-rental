package com.carrental.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Collection;

@Entity
@Table(name = "brand")
@Getter
@Setter
public class BrandEntity extends BaseEntity {
    private String name;
    @OneToMany(mappedBy = "brand")
    private Collection<CarEntity> cars;
    @OneToMany(mappedBy = "brand")
    private Collection<ModelEntity> models;
}

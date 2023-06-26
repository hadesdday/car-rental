package com.carrental.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "travel_type")
@Getter
@Setter
public class TravelTypeEntity extends BaseEntity {
    private String name;
    private String code;

    @OneToMany(mappedBy = "travelType")
    private List<ServiceTypeEntity> serviceTypes;
}

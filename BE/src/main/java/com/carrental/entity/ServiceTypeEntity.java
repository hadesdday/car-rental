package com.carrental.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "service_type")
@Getter
@Setter
public class ServiceTypeEntity extends BaseEntity {
    private String name;

    @ManyToOne
    @JoinColumn(name = "travel_type_id")
    private TravelTypeEntity travelType;

    @OneToMany(mappedBy = "serviceType")
    private Collection<ServiceFeeEntity> serviceFees;


}

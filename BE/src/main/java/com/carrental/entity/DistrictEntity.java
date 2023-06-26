package com.carrental.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "district")
@Getter
@Setter
public class DistrictEntity extends BaseEntity {
    private String name;
    private String prefix;

    @ManyToOne
    @JoinColumn(name = "province_id")
    private ProvinceEntity province;
}

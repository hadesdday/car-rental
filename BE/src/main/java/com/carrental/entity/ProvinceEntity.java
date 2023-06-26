package com.carrental.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Collection;

@Entity
@Table(name = "province")
@Getter
@Setter
public class ProvinceEntity extends BaseEntity {
    private Integer code;
    private String name;
    private String domain;
    @OneToMany(mappedBy = "province")
    private Collection<DistrictEntity> districts;
    @OneToMany(mappedBy = "provinceWard")
    private Collection<WardEntity> wards;
}

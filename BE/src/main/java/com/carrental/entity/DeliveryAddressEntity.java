package com.carrental.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "delivery_address")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryAddressEntity extends BaseEntity {
    private String addressName;

    @ManyToOne
    @JoinColumn(name = "province_id")
    private ProvinceEntity province;
    @ManyToOne
    @JoinColumn(name = "district_id")
    private DistrictEntity district;
    @ManyToOne
    @JoinColumn(name = "ward_id")
    private WardEntity ward;

    @OneToMany(mappedBy = "address",cascade = CascadeType.ALL)
    private List<CarEntity> cars;
}

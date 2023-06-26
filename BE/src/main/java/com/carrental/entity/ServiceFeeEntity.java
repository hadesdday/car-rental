package com.carrental.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "service_fee")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceFeeEntity extends BaseEntity {
    private Double defaultPrice;
    private Integer discountByWeek;
    private Integer discountByMonth;

    @OneToOne(mappedBy = "service")
    private CarEntity car;

    @OneToMany(mappedBy = "serviceFee", targetEntity = ExtraFeeEntity.class, cascade = CascadeType.ALL)
    private List<ExtraFeeEntity> extraFeeList;

    @ManyToOne
    @JoinColumn(name = "service_type_id")
    private ServiceTypeEntity serviceType;
}

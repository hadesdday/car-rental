package com.carrental.dto;

import com.carrental.entity.DistrictEntity;
import com.carrental.entity.ProvinceEntity;
import com.carrental.entity.WardEntity;
import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
public class DeliveryAddressDTO {
    private String addressName;
    private ProvinceDTO province;
    private DistrictDTO district;
    private WardDTO ward;
}

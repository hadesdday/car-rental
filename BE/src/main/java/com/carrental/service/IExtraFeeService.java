package com.carrental.service;

import com.carrental.entity.ExtraFeeEntity;

import java.util.List;

public interface IExtraFeeService {
    List<ExtraFeeEntity> saveAll(List<ExtraFeeEntity> list);

    Double findDeliveryToTenantFee(Long id);
    Long findDistanceLimit(Long id);
}

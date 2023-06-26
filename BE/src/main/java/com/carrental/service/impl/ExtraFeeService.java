package com.carrental.service.impl;

import com.carrental.entity.ExtraFeeEntity;
import com.carrental.repository.IExtraFeeRepository;
import com.carrental.service.IExtraFeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExtraFeeService implements IExtraFeeService {
    @Autowired
    private IExtraFeeRepository repository;

    @Override
    public List<ExtraFeeEntity> saveAll(List<ExtraFeeEntity> list) {
        return repository.saveAll(list);
    }

    @Override
    public Double findDeliveryToTenantFee(Long id) {
        ExtraFeeEntity fee = repository.findFirstByServiceFeeIdAndName(id, "Giao xe tận nơi");
        if (null == fee) return 0.0;
        return fee.getFee();
    }

    @Override
    public Long findDistanceLimit(Long id) {
        ExtraFeeEntity fee = repository.findFirstByServiceFeeIdAndName(id, "Giới hạn số KM");
        if (null == fee) return 0L;
        return fee.getLimitValue();
    }

}

package com.carrental.service.impl;


import com.carrental.entity.ServiceFeeEntity;
import com.carrental.repository.IServiceFeeRepository;
import com.carrental.service.IServiceFeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceFeeService implements IServiceFeeService {
    @Autowired
    private IServiceFeeRepository repository;

    @Override
    public ServiceFeeEntity save(ServiceFeeEntity request) throws Exception {
        return repository.save(request);
    }
}

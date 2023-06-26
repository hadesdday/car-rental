package com.carrental.service;

import com.carrental.entity.ServiceFeeEntity;
import com.carrental.requestmodel.ServiceFeeRequest;

public interface IServiceFeeService {
    ServiceFeeEntity save(ServiceFeeEntity request) throws Exception;
}

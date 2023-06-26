package com.carrental.service;

import com.carrental.entity.ServiceTypeEntity;
import com.carrental.responsemodel.IdNameResponse;

import java.util.List;

public interface IServiceTypeService {
    ServiceTypeEntity findById(Long id) throws Exception;
    List<IdNameResponse> findAll();
}

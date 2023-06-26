package com.carrental.service;

import com.carrental.entity.ProvinceEntity;
import com.carrental.responsemodel.ProvinceResponse;

import java.util.List;

public interface IProvinceService {
    List<ProvinceResponse> findAll();
    ProvinceEntity findById(Long id) throws Exception;
}

package com.carrental.service;

import com.carrental.entity.DistrictEntity;
import com.carrental.responsemodel.DistrictResponse;

import java.util.List;

public interface IDistrictService {
    List<DistrictResponse> findByProvinceId(Long provinceId);

    DistrictEntity findById(Long id) throws Exception;
}

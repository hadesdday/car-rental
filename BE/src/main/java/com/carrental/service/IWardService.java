package com.carrental.service;

import com.carrental.entity.WardEntity;
import com.carrental.responsemodel.WardResponse;

import java.util.List;

public interface IWardService {
    List<WardResponse> findAllByDistrictId(Long provinceId, Long districtId);

    WardEntity findById(Long id) throws Exception;
}

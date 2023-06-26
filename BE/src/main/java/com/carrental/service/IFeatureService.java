package com.carrental.service;

import com.carrental.entity.FeatureEntity;
import com.carrental.responsemodel.FeatureDTO;

import java.util.List;

public interface IFeatureService {
    List<FeatureDTO> findAll();
    List<FeatureEntity> findAllByIdIn(List<Long> ids);

    FeatureEntity save(FeatureEntity f);
}

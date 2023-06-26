package com.carrental.service;

import com.carrental.entity.TravelTypeEntity;

public interface ITravelTypeService {
    TravelTypeEntity findById(Long id) throws Exception;
}

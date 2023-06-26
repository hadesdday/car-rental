package com.carrental.service;

import com.carrental.entity.ModelEntity;

public interface IModelService {
    ModelEntity findById(Long id) throws Exception;
}

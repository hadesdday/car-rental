package com.carrental.service.impl;

import com.carrental.entity.ModelEntity;
import com.carrental.repository.IModelRepository;
import com.carrental.service.IModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ModelService implements IModelService {
    @Autowired
    private IModelRepository repository;

    @Override
    public ModelEntity findById(Long id) throws Exception {
        Optional<ModelEntity> model = repository.findById(id);
        if (!model.isPresent()) throw new Exception("No model was found !");
        return model.get();
    }
}

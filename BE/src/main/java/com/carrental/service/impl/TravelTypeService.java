package com.carrental.service.impl;

import com.carrental.entity.TravelTypeEntity;
import com.carrental.repository.ITravelTypeRepository;
import com.carrental.service.ITravelTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TravelTypeService implements ITravelTypeService {
    @Autowired
    private ITravelTypeRepository repository;

    @Override
    public TravelTypeEntity findById(Long id) throws Exception {
        Optional<TravelTypeEntity> travelTypeEntity = repository.findById(id);
        if (!travelTypeEntity.isPresent()) throw new Exception("No travel type was found !");
        return travelTypeEntity.get();
    }
}

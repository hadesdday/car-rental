package com.carrental.service.impl;

import com.carrental.entity.FeatureEntity;
import com.carrental.repository.IFeatureRepository;
import com.carrental.responsemodel.FeatureDTO;
import com.carrental.service.IFeatureService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeatureService implements IFeatureService {
    @Autowired
    private IFeatureRepository repository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<FeatureDTO> findAll() {
        return repository.findAll().stream().map(i -> mapper.map(i, FeatureDTO.class)).collect(Collectors.toList());
    }

    @Override
    public List<FeatureEntity> findAllByIdIn(List<Long> ids) {
        return repository.findAllByIdIn(ids);
    }

    @Override
    public FeatureEntity save(FeatureEntity f) {
        return this.repository.save(f);
    }
}

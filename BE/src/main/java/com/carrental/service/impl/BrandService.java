package com.carrental.service.impl;

import com.carrental.entity.BrandEntity;
import com.carrental.repository.IBrandRepository;
import com.carrental.responsemodel.BrandResponse;
import com.carrental.responsemodel.ModelDTO;
import com.carrental.service.IBrandService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BrandService implements IBrandService {
    @Autowired
    private IBrandRepository repository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<ModelDTO> findModelsById(Long id) throws Exception {
        Optional<BrandEntity> brand = repository.findById(id);
        if (!brand.isPresent()) throw new Exception("No model car was found !");
        return brand.get().getModels()
                .stream().map(i -> mapper.map(i, ModelDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public BrandEntity findById(Long id) throws Exception {
        Optional<BrandEntity> brand = repository.findById(id);
        if (!brand.isPresent()) throw new Exception("No brand was found !");
        return brand.get();
    }

    @Override
    public List<BrandResponse> findAll() {
        return repository.findAll().stream()
                .map(i -> mapper.map(i, BrandResponse.class)).collect(Collectors.toList());
    }
}

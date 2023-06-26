package com.carrental.service.impl;

import com.carrental.entity.ProvinceEntity;
import com.carrental.entity.WardEntity;
import com.carrental.repository.IProvinceRepository;
import com.carrental.responsemodel.ProvinceResponse;
import com.carrental.service.IProvinceService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProvinceService implements IProvinceService {
    @Autowired
    private IProvinceRepository provinceRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<ProvinceResponse> findAll() {
        return provinceRepository.findAll()
                .stream().map(i -> mapper.map(i, ProvinceResponse.class)).collect(Collectors.toList());
    }

    @Override
    public ProvinceEntity findById(Long id) throws Exception {
        Optional<ProvinceEntity> province = provinceRepository.findById(id);
        if (!province.isPresent()) throw new Exception("No province was found !");
        return province.get();
    }
}

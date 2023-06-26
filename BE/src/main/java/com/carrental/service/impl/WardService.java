package com.carrental.service.impl;

import com.carrental.entity.WardEntity;
import com.carrental.repository.IWardRepository;
import com.carrental.responsemodel.WardResponse;
import com.carrental.service.IWardService;
import com.carrental.specification.WardSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WardService implements IWardService {
    @Autowired
    private IWardRepository wardRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<WardResponse> findAllByDistrictId(Long provinceId, Long districtId) {
        Specification<WardEntity> spec = Specification.where(WardSpecification.hasDistrictAndProvinceId(provinceId, districtId));
        return wardRepository.findAll(spec)
                .stream().map(i -> mapper.map(i, WardResponse.class)).collect(Collectors.toList());
    }

    @Override
    public WardEntity findById(Long id) throws Exception {
        Optional<WardEntity> ward = wardRepository.findById(id);
        if (!ward.isPresent()) throw new Exception("No ward was found !");
        return ward.get();
    }
}

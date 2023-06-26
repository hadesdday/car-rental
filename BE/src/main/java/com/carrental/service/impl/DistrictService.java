package com.carrental.service.impl;

import com.carrental.entity.DistrictEntity;
import com.carrental.entity.ProvinceEntity;
import com.carrental.repository.IDistrictRepository;
import com.carrental.responsemodel.DistrictResponse;
import com.carrental.service.IDistrictService;
import com.carrental.specification.DistrictSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistrictService implements IDistrictService {
    @Autowired
    private IDistrictRepository districtRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<DistrictResponse> findByProvinceId(Long provinceId) {
        Specification<DistrictEntity> spec = Specification.where(DistrictSpecification.hasProvinceId(provinceId));
        return districtRepository.findAll(spec)
                .stream().map(i -> mapper.map(i, DistrictResponse.class)).collect(Collectors.toList());
    }

    @Override
    public DistrictEntity findById(Long id) throws Exception {
        Optional<DistrictEntity> district = districtRepository.findById(id);
        if (!district.isPresent()) throw new Exception("No district was found !");
        return district.get();
    }
}

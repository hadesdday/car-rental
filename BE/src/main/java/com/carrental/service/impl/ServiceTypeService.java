package com.carrental.service.impl;

import com.carrental.entity.ServiceTypeEntity;
import com.carrental.repository.IServiceTypeRepository;
import com.carrental.responsemodel.IdNameResponse;
import com.carrental.service.IServiceTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceTypeService implements IServiceTypeService {

    @Autowired
    private IServiceTypeRepository repository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public ServiceTypeEntity findById(Long id) throws Exception {
        Optional<ServiceTypeEntity> service = repository.findById(id);
        if (!service.isPresent()) throw new Exception("Không tìm thấy dịch vụ !");
        return service.get();
    }

    @Override
    public List<IdNameResponse> findAll() {
        return repository.findAll().stream().map(i -> mapper.map(i, IdNameResponse.class))
                .collect(Collectors.toList());
    }
}

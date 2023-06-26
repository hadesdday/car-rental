package com.carrental.utils;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component(value = "ModelMapperUtils")
public class ModelMapperUtils {
    @Autowired
    private ModelMapper modelMapper;

    public <D, T> List<D> mapAll(final Collection<T> sourceCollection, Class<D> desClass) {
        return sourceCollection.stream().map(entity -> this.modelMapper.map(entity, desClass))
                .collect(Collectors.toList());
    }
    public <D, T> Set<D> mapAllSet(final Collection<T> sourceCollection, Class<D> desClass) {
        return sourceCollection.stream().map(entity -> this.modelMapper.map(entity, desClass))
                .collect(Collectors.toSet());
    }
    public <D, T> D map(T entity, Class<D> desClass) {
        return this.modelMapper.map(entity, desClass);
    }
}

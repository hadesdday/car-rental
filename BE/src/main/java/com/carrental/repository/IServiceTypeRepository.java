package com.carrental.repository;

import com.carrental.entity.ServiceTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IServiceTypeRepository extends JpaRepository<ServiceTypeEntity, Long> {
}

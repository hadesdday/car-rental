package com.carrental.repository;

import com.carrental.entity.ServiceFeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IServiceFeeRepository extends JpaRepository<ServiceFeeEntity, Long> {
}

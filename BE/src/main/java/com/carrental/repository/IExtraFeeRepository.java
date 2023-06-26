package com.carrental.repository;

import com.carrental.entity.ExtraFeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IExtraFeeRepository extends JpaRepository<ExtraFeeEntity, Long>, JpaSpecificationExecutor<ExtraFeeEntity> {
    ExtraFeeEntity findFirstByServiceFeeIdAndName(Long serviceId, String name);
}

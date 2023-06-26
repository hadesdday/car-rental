package com.carrental.repository;

import com.carrental.entity.ModelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IModelRepository extends JpaRepository<ModelEntity, Long> {
}

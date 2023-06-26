package com.carrental.repository;

import com.carrental.entity.JWTEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
@Repository
public interface IJWTRepository extends JpaRepository<JWTEntity, Long> {

    JWTEntity findByToken(String token);

    @Transactional
    Long removeByToken(String token);
}

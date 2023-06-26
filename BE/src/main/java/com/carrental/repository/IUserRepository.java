package com.carrental.repository;

import com.carrental.entity.UserEntity;
import com.carrental.enums.OAuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<UserEntity, Long>, JpaSpecificationExecutor<UserEntity> {
    UserEntity findByUsername(String username);

    UserEntity findByUsernameAndProvider(String username, OAuthProvider provider);
}

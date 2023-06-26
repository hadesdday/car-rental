package com.carrental.service;

import com.carrental.dto.PromoDTO;
import com.carrental.entity.PromoEntity;
import com.carrental.requestmodel.NewPromoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface IPromoService {
    List<PromoDTO> findAllAvailable(Specification<PromoEntity> spec);
    List<PromoDTO> findAll();

    PromoEntity addNewPromo(NewPromoRequest newPromo);
    void removePromo(Long id);

    PromoDTO updatePromo(PromoDTO updatedPromo);

    PromoEntity findById(Long id);
}

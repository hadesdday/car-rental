package com.carrental.service.impl;

import com.carrental.dto.PromoDTO;
import com.carrental.entity.PromoEntity;
import com.carrental.enums.StandardStatus;
import com.carrental.repository.IPromoRepository;
import com.carrental.requestmodel.NewPromoRequest;
import com.carrental.service.IPromoService;
import com.carrental.utils.ModelMapperUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PromoService implements IPromoService {

    @Autowired
    private IPromoRepository promoRepository;
    @Autowired
    private ModelMapper mp;
    @Autowired
    private ModelMapperUtils mpu;

    @Override
    public List<PromoDTO> findAllAvailable(Specification<PromoEntity> spec) {
        List<PromoEntity> promos = this.promoRepository.findAll(spec);
        return mpu.mapAll(promos, PromoDTO.class);
    }

    @Override
    public List<PromoDTO> findAll() {
        return mpu.mapAll(this.promoRepository.findAll(), PromoDTO.class);
    }

    @Override
    public PromoEntity addNewPromo(NewPromoRequest newPromo) {
        PromoEntity promoEntity = this.mp.map(newPromo, PromoEntity.class);
        promoEntity.setStatus(StandardStatus.ACTIVATED);
        return this.promoRepository.save(promoEntity);
    }

    @Override
    public void removePromo(Long id) {
        this.promoRepository.deleteById(id);
    }

    @Override
    public PromoDTO updatePromo(PromoDTO updatedPromo) {
        PromoEntity foundPromo = this.promoRepository.findById(updatedPromo.getId()).get();
        this.mp.map(updatedPromo, foundPromo);
        this.promoRepository.save(foundPromo);
        return this.mp.map(foundPromo, PromoDTO.class);
    }

    @Override
    public PromoEntity findById(Long id) {
        return this.promoRepository.getById(id);
    }
}

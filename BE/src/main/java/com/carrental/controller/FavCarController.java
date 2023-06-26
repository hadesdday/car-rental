package com.carrental.controller;

import com.carrental.entity.CarEntity;
import com.carrental.entity.FavoriteCarEntity;
import com.carrental.entity.UserEntity;
import com.carrental.repository.IFavCarRepository;
import com.carrental.responsemodel.CarResponse;
import com.carrental.service.IFavCarService;
import com.carrental.service.impl.CarService;
import com.carrental.service.impl.UserService;
import com.carrental.utils.ModelMapperUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api/fav-cars")
@CrossOrigin("http://localhost:4200")
public class FavCarController {
    @Autowired
    private UserService userService;

    @Autowired
    private IFavCarService favCarService;

    @Autowired
    private CarService carService;

    @Autowired
    private ModelMapperUtils mpu;

    @GetMapping("/{userId}")
    private ResponseEntity findAll(@PathVariable Long userId){
        List<FavoriteCarEntity> found = this.favCarService.findAllByUserId(userId);
        List<CarResponse> result = new LinkedList<>();
        found.forEach(f -> {
            result.add(this.mpu.map(f.getCar(), CarResponse.class));
        });
        return ResponseEntity.ok(result);
    }
    @PostMapping("/{carId}/user/{userId}")
    public ResponseEntity addFavCar(@PathVariable Long carId, @PathVariable Long userId) {
        try {
            CarEntity foundCar = this.carService.findById(carId).get();
            UserEntity foundUser = this.userService.getOne(userId);
            FavoriteCarEntity favoriteCarEntity = new FavoriteCarEntity();
            favoriteCarEntity.setCar(foundCar);
            favoriteCarEntity.setUser(foundUser);
            this.favCarService.saveAndFlush(favoriteCarEntity);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }

    @DeleteMapping("/{carId}/user/{userId}")
    public ResponseEntity removeFavCar(@PathVariable Long carId, @PathVariable Long userId) {
        try {
            FavoriteCarEntity favoriteCarEntity = this.favCarService.findByCarIdAndUserId(carId, userId);
            if (favoriteCarEntity != null) {
                this.favCarService.deleteById(favoriteCarEntity.getId());
                return ResponseEntity.ok(true);
            } else {
                return ResponseEntity.ok(false);
            }
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }

}

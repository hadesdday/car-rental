package com.carrental;

import com.carrental.service.IFileStorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.annotation.Resource;

@SpringBootApplication
@EnableJpaRepositories
public class CarRentalApplication implements CommandLineRunner {
    @Resource
    IFileStorageService storageService;

    public static void main(String[] args) {
        SpringApplication.run(CarRentalApplication.class, args);
    }

    @Override
    public void run(String... arg) throws Exception {
        storageService.init();
    }
}

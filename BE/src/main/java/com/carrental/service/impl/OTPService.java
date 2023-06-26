package com.carrental.service.impl;

import com.carrental.service.IOTPService;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class OTPService implements IOTPService {
    private static final Integer EXPIRE_MIN = 5;
    private final LoadingCache<String, Integer> OTPCache;

    public OTPService() {
        this.OTPCache = CacheBuilder.newBuilder().
                expireAfterWrite(EXPIRE_MIN, TimeUnit.MINUTES)
                .build(new CacheLoader<String, Integer>() {
                    public Integer load(String key) {
                        return 0;
                    }
                });
    }

    @Override
    public int generateOTP(String key) {
        Random random = new Random();
        int OTP = 100000 + random.nextInt(900000);
        this.OTPCache.put(key, OTP);
        return OTP;
    }

    @Override
    public int getOTP(String key) {
        try{
            return this.OTPCache.get(key);
        }catch (Exception e){
            return 0;
        }
    }

    @Override
    public void clearOTP(String key) {
        this.OTPCache.invalidate(key);
    }
}

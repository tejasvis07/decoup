package com.example.demo.service;

import com.example.demo.model.CouponModel;
import com.example.demo.repo.CouponRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CouponService {

    @Autowired
    private CouponRepo couponRepository;

    public CouponModel saveCoupon(CouponModel coupon) {
        return couponRepository.save(coupon);
    }

    public List<CouponModel> getCouponsByMerchant(String merchant) {
        return couponRepository.findByMerchant(merchant);
    }

    public boolean deleteCouponByCode(String code) {
        Optional<CouponModel> coupon = couponRepository.findByCode(code);
        if (coupon.isPresent()) {
            couponRepository.delete(coupon.get());
            return true;
        }
        return false;
    }

    public CouponModel getCouponByCode(String code) {
        return couponRepository.findByCode(code).orElse(null);
    }
}

package com.example.demo.controller;

import com.example.demo.model.CouponModel;
import com.example.demo.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @PostMapping("/add")
    public ResponseEntity<CouponModel> addCoupon(@RequestBody CouponModel coupon) {
        try {
            CouponModel newCoupon = couponService.saveCoupon(coupon);
            return new ResponseEntity<>(newCoupon, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace(); // Print stack trace for debugging
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{merchant}")
    public ResponseEntity<List<CouponModel>> getCouponsByMerchant(@PathVariable String merchant) {
        try {
            List<CouponModel> coupons = couponService.getCouponsByMerchant(merchant);
            if (coupons.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(coupons, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Print stack trace for debugging
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{code}")
    public ResponseEntity<CouponModel> updateCoupon(@PathVariable String code, @RequestBody CouponModel updatedCoupon) {
        try {
            CouponModel existingCoupon = couponService.getCouponByCode(code);
            if (existingCoupon == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            existingCoupon.setTitle(updatedCoupon.getTitle());
            existingCoupon.setDescription(updatedCoupon.getDescription());
            existingCoupon.setExpiry(updatedCoupon.getExpiry());
            existingCoupon.setImage(updatedCoupon.getImage());

            CouponModel updated = couponService.saveCoupon(existingCoupon);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Print stack trace for debugging
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{code}")
    public ResponseEntity<HttpStatus> deleteCoupon(@PathVariable String code) {
        try {
            boolean isRemoved = couponService.deleteCouponByCode(code);
            if (!isRemoved) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace(); // Print stack trace for debugging
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

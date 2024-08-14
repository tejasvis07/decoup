package com.example.demo.service;

import com.example.demo.model.CouponSales;
import com.example.demo.repo.CouponSalesRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CouponSalesService {

    private final CouponSalesRepo repository;
    private static final Logger logger = LoggerFactory.getLogger(CouponSalesService.class);

    public CouponSalesService(CouponSalesRepo repository) {
        this.repository = repository;
    }

    public List<CouponSales> getAllCouponSales() {
        logger.info("Fetching all coupon sales data.");
        return repository.findAll();
    }

    public void saveDummyData() {
        long count = repository.count();
        if (count == 0) {
            logger.info("No coupon sales data found. Saving dummy data.");
            repository.save(new CouponSales(1L, "Amazon", 120));
            repository.save(new CouponSales(2L, "Myntra", 95));
            repository.save(new CouponSales(3L, "Ajio", 85));
            repository.save(new CouponSales(4L, "Zomato", 75));
            logger.info("Dummy data saved successfully.");
        } else {
            logger.info("Coupon sales data already exists. No dummy data saved.");
        }
    }
}

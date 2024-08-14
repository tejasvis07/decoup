package com.example.demo.controller;

import com.example.demo.model.CouponSales;
import com.example.demo.service.CouponSalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/couponsales")
@CrossOrigin(origins="http://localhost:3000")
public class AdmindashboardController {

    @Autowired
    private CouponSalesService service;

    @GetMapping("/all")
    public List<CouponSales> getAllCouponSales() {
        // Ensure dummy data is loaded
        service.saveDummyData();
        return service.getAllCouponSales();
    }
}

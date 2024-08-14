package com.example.demo.controller;

import com.example.demo.model.Coupon;
import com.example.demo.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @GetMapping("/dashboard")
    public DashboardData getDashboardData() {
        User user = new User("John Doe", "john@example.com", "2022-01-01");
        List<Coupon> coupons = Arrays.asList(
                new Coupon("Amazon", 400),
                new Coupon("Myntra", 300),
                new Coupon("Ajio", 300),
                new Coupon("Zomato", 200)
        );
        return new DashboardData(user, coupons);
    }
}

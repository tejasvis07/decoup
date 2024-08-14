package com.example.demo.controller;

import com.example.demo.model.Coupon;
import com.example.demo.model.User;

import java.util.List;

public class DashboardData {
    private User user;
    private List<Coupon> coupons;

    public DashboardData(User user, List<Coupon> coupons) {
        this.user = user;
        this.coupons = coupons;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Coupon> getCoupons() {
        return coupons;
    }

    public void setCoupons(List<Coupon> coupons) {
        this.coupons = coupons;
    }
}

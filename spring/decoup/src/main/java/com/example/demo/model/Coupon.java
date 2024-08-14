package com.example.demo.model;

public class Coupon {
	private String name;
    private int value;

    // Constructors, getters, and setters
    public Coupon(String name, int value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}

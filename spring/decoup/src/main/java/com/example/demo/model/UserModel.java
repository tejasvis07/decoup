package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String memberSince;
    private String role;

    // Constructors
    public UserModel() {}

    public UserModel(String name, String email, String password, String memberSince) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.memberSince = memberSince;
        this.role = determineRole(email); // Automatically set role based on email
    }

    // Method to determine role based on email (similar to what you'd do in SignInRequest)
    private String determineRole(String email) {
        if (email.contains("admin")) {
            return "ADMIN";
        } else if (email.contains("ajio") || email.contains("amazon") || email.contains("myntra") || email.contains("zomato")) {
            return "MERCHANT";
        } else {
            return "USER";
        }
    }

    // Getters and Setters...
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
        this.role = determineRole(email); 
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMemberSince() {
        return memberSince;
    }

    public void setMemberSince(String memberSince) {
        this.memberSince = memberSince;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

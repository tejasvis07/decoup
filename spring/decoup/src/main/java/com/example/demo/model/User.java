package com.example.demo.model;

public class User {
	private String name;
    private String email;
    private String memberSince;

    // Constructors, getters, and setters
    public User(String name, String email, String memberSince) {
        this.name = name;
        this.email = email;
        this.memberSince = memberSince;
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
    }

    public String getMemberSince() {
        return memberSince;
    }

    public void setMemberSince(String memberSince) {
        this.memberSince = memberSince;
    }
}

package com.example.demo.service;

import com.example.demo.model.UserModel;
import com.example.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    public UserModel saveUser(UserModel user) {
        String email = user.getEmail();

        // Determine the user type based on the email domain
        if (email.contains("admin")) {
            user.setRole("ADMIN");
        } else if (email.contains("ajio") || email.contains("amazon") || email.contains("myntra") || email.contains("zomato")) {
            user.setRole("MERCHANT");
        } else {
            user.setRole("CUSTOMER");
        }

        // Save the user in the database
        return userRepository.save(user);
    }

    public UserModel findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}

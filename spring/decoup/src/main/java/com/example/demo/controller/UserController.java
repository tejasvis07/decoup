package com.example.demo.controller;

import com.example.demo.dto.SignInRequest;
import com.example.demo.model.UserModel;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/decoup")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserModel> registerUser(@RequestBody UserModel user) {
        UserModel existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT); // Email already exists
        }
        UserModel newUser = userService.saveUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
    @PostMapping("/signin")
    public ResponseEntity<UserModel> signInUser(@RequestBody SignInRequest signInRequest) {
        UserModel user = userService.findByEmail(signInRequest.getEmail());
        if (user != null && user.getPassword().equals(signInRequest.getPassword())) {
            return new ResponseEntity<>(user, HttpStatus.OK); // User found and password matches
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED); // Incorrect credentials
        }
    }


}

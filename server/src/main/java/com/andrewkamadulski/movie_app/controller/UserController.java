package com.andrewkamadulski.movie_app.controller;

import com.andrewkamadulski.movie_app.requestmodels.UserRequest;
import com.andrewkamadulski.movie_app.service.UserService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
    public UserController userController;

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/secure/add/user")
    public void addUser(@RequestHeader(value="Authorization") String token,
                          @RequestBody UserRequest userRequest)  {
        userService.addUser(userRequest);
    };





}

package com.andrewkamadulski.movie_app.controller;


import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/movies")
public class MovieController {


    @GetMapping("/secure/add/movie")
    public void addMovie(@RequestHeader(value="Authorization") String token)  {
      System.out.println("adding movie");
    };
}

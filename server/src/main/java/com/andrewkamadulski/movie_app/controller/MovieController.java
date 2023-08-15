package com.andrewkamadulski.movie_app.controller;


import com.andrewkamadulski.movie_app.requestmodels.MovieRequest;
import com.andrewkamadulski.movie_app.service.MovieService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/movies")
public class MovieController {

public MovieController movieController;

private MovieService movieService;

public MovieController(MovieService movieService) {
    this.movieService = movieService;
}

    @PostMapping("/secure/add/movie")
    public void addMovie(@RequestHeader(value="Authorization") String token,
                         @RequestBody MovieRequest movieRequest) throws Exception {
        movieService.addMovie(movieRequest);
    };
}

package com.andrewkamadulski.movie_app.controller;

import com.andrewkamadulski.movie_app.requestmodels.RatingRequest;
import com.andrewkamadulski.movie_app.service.RatingService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/ratings")
public class RatingController {
    private RatingService ratingService;


    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    public RatingController ratingController;



    @PostMapping("/secure/add/rating")
    public void addRating(@RequestHeader(value="Authorization") String token,
                          @RequestBody RatingRequest ratingRequest)  {
        ratingService.addRating(ratingRequest);
    };


}

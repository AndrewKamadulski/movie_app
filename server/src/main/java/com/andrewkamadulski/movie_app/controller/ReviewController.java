package com.andrewkamadulski.movie_app.controller;

import com.andrewkamadulski.movie_app.requestmodels.ReviewRequest;
import com.andrewkamadulski.movie_app.service.ReviewService;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    public ReviewController reviewController;
    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    };

    @PostMapping("/secure/add/review")
    public void addReview(@RequestHeader(value="Authorization") String token,
                         @RequestBody ReviewRequest reviewRequest) throws Exception {
       reviewService.saveReview(reviewRequest);
    };

    @PutMapping("/secure/update/review")
    public void updateReview(@RequestHeader(value="Authorization") String token,
                          @RequestBody ReviewRequest reviewRequest) throws Exception {
        reviewService.saveReview(reviewRequest);
    };

    @DeleteMapping("secure/delete/review/{id}")
    public void deleteReview(@RequestHeader(value="Authorization") String token,
                             @PathVariable("id") Long id) throws Exception {
        reviewService.deleteReview(id);
    };

};

package com.andrewkamadulski.movie_app.service;

import com.andrewkamadulski.movie_app.dao.ReviewsRepository;
import com.andrewkamadulski.movie_app.entity.Review;
import com.andrewkamadulski.movie_app.requestmodels.ReviewRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {

    @Autowired
    private ReviewsRepository reviewsRepository;


    public void addReview(ReviewRequest reviewRequest)  {

        Review review = new Review();

       review.setUserId(reviewRequest.getUser());
        review.setMovieId(reviewRequest.getMovie());
        review.setReviewText(reviewRequest.getReviewText());
        review.setCreatedAt(Date.valueOf(LocalDate.now()));

        reviewsRepository.save(review);
    }

    public void updateReview(ReviewRequest reviewRequest)  {

        Review review = new Review();

        review.setUserId(reviewRequest.getUser());
        review.setMovieId(reviewRequest.getMovie());
        review.setReviewText(reviewRequest.getReviewText());

        reviewsRepository.save(review);
    }

    public void deleteReview(Long reviewId)  {

        reviewsRepository.deleteById(reviewId);
    }

}

package com.andrewkamadulski.movie_app.service;

import com.andrewkamadulski.movie_app.dao.RatingsRepository;
import com.andrewkamadulski.movie_app.entity.Rating;
import com.andrewkamadulski.movie_app.requestmodels.RatingRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class RatingService {

    private RatingsRepository ratingsRepository;

    public void addRating(RatingRequest ratingRequest) {



        Rating rating = new Rating();

        rating.setRating(ratingRequest.getRating());
        rating.setUserId(ratingRequest.getUserId());
        rating.setMovieId(ratingRequest.getMovieId());

        ratingsRepository.save(rating);
    }

}

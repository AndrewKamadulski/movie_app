package com.andrewkamadulski.movie_app.requestmodels;

import com.andrewkamadulski.movie_app.entity.Movie;
import com.andrewkamadulski.movie_app.entity.User;
import lombok.Data;

@Data
public class RatingRequest {

    private Float rating;

    private User userId;

    private Movie movieId;

}

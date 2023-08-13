package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Movie;
import com.andrewkamadulski.movie_app.entity.Reply;
import com.andrewkamadulski.movie_app.entity.Review;
import com.andrewkamadulski.movie_app.entity.User;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.List;

@Projection(name = "completeReview", types = { Review.class })
interface CompleteReview {

   List<Reply> getReplies();


   String getReviewText();

   Date getCreatedAt();

   User getUserId();

   Movie getMovieId();



}
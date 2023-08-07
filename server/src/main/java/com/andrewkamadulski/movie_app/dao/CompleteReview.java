package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Reply;
import com.andrewkamadulski.movie_app.entity.Review;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "completeReview", types = { Review.class })
interface CompleteReview {

   List<Reply> getReplies();
   Long getId();
   String getReviewText();

}
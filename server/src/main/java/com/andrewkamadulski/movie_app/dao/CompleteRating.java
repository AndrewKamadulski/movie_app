package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Rating;
import com.andrewkamadulski.movie_app.entity.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "CompleteRating", types = { Rating.class })
public interface CompleteRating {
User getUserId();

Float getRating();

}

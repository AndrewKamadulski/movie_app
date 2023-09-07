package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = CompleteRating.class)
public interface RatingsRepository extends JpaRepository<Rating, Long> {


}

package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingsRepository extends JpaRepository<Rating, Long> {


}

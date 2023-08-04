package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Ratings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface RatingsRepository extends JpaRepository<Ratings, Long> {

    Page<Ratings> findByMovieId(@RequestParam("movie_id") Long movieId, Pageable pageable);
}

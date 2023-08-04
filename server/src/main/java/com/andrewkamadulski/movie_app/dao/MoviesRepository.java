package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoviesRepository extends JpaRepository<Movie, Long> {

}
package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Movies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoviesRepository extends JpaRepository<Movies, Long> {

}
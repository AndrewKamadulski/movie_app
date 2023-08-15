package com.andrewkamadulski.movie_app.service;

import com.andrewkamadulski.movie_app.dao.MoviesRepository;
import com.andrewkamadulski.movie_app.entity.Movie;

import java.util.Optional;

public class MovieService {
    private MoviesRepository moviesRepository;


    public Movie addMovie(Long movieId, String title) throws Exception {
        Optional<Movie> movie = moviesRepository.findById(movieId);

        if(movie.isPresent()){
            throw new Exception("Movie already in database.");
        }

        Movie movieToAdd = new Movie (
            movieId,
                title
        );
    moviesRepository.save(movieToAdd);
    return movieToAdd;

    }
}

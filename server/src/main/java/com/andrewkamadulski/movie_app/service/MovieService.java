package com.andrewkamadulski.movie_app.service;

import com.andrewkamadulski.movie_app.dao.MoviesRepository;
import com.andrewkamadulski.movie_app.entity.Movie;
import com.andrewkamadulski.movie_app.requestmodels.MovieRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@Transactional
public class MovieService {

    @Autowired
    private MoviesRepository moviesRepository;


    public void addMovie(MovieRequest movieRequest) throws Exception {
        Optional<Movie> movie = moviesRepository.findById(movieRequest.getMovieId());

        if(movie.isPresent()){
            throw new Exception("Movie already in database.");
        }

        Movie movieToAdd = new Movie();

            movieToAdd.setId(movieRequest.getMovieId());
            movieToAdd.setTitle(movieRequest.getTitle());

    moviesRepository.save(movieToAdd);
    }
}

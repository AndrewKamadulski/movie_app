package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewsRepository extends JpaRepository<Review, Long> {

    Page<Review> findByMovieId(@RequestParam("movie_id") Long movieId, Pageable pageable);

    Page<Review> findByUserId(@RequestParam("user_Id") String userEmail, Pageable pageable);
}

package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = CompleteReview.class)
public interface ReviewsRepository extends JpaRepository<Review, Long> {
    @Query(
            value = "SELECT  * FROM reviews WHERE movie_id = :movieId", nativeQuery = true)
            Page<Review> findByMovieId(@Param("movieId") Long movieId, Pageable pageable);

    @Query(
            value = "SELECT * FROM reviews WHERE user_id = :userId", nativeQuery = true)
            Page<Review> findByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query(
            value =
            """
            SELECT review_text, replies.reply_text, replies.user_name, movies.title from reviews
            join movies on movies.id= reviews.movie_id
            join replies on replies.review_id = reviews.id
            where movie_id='615656'
            """
            , nativeQuery = true)
    Page<Review> findSingleReview(@Param("reviewId") Long reviewId, Pageable pageable);
}





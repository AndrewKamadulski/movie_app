package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Replies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface RepliesRepository extends JpaRepository<Replies, Long> {
    Page<Replies> findByReviewId(@RequestParam("review_id") Long reviewId, Pageable pageable);

}

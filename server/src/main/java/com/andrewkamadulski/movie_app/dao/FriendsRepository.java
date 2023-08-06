package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Friend;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface FriendsRepository extends JpaRepository<Friend, Long> {

    Page<Friend> findByUserId(@RequestParam("user_id") long userId, Pageable pageable);
}


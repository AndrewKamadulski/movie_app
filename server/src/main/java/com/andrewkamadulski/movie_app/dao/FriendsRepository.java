package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Friends;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface FriendsRepository extends JpaRepository<Friends, Long> {

    Page<Friends> findByUserId(@RequestParam("user_id") long userId, Pageable pageable);
}

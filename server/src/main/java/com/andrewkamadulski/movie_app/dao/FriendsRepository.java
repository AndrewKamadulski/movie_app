package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendsRepository extends JpaRepository<Friend, Long> {


}

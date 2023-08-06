package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepliesRepository extends JpaRepository<Reply, Long> {


}

package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = CompleteReply.class)
public interface RepliesRepository extends JpaRepository<Reply, Long> {



}

package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Friend;
import com.andrewkamadulski.movie_app.entity.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "CompleteReview", types = { Friend.class })
public interface CompleteFriend {
    User getFriendId();

}

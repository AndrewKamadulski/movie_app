package com.andrewkamadulski.movie_app.requestmodels;

import com.andrewkamadulski.movie_app.entity.User;
import lombok.Data;

@Data
public class FriendRequest {
    private User friendId;
    private User user;

}

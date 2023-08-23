package com.andrewkamadulski.movie_app.service;

import com.andrewkamadulski.movie_app.dao.FriendsRepository;
import com.andrewkamadulski.movie_app.entity.Friend;
import com.andrewkamadulski.movie_app.requestmodels.FriendRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class FriendService {

    @Autowired
    private FriendsRepository friendsRepository;

    public void addFriend(FriendRequest friendRequest) {



        Friend friend1 = new Friend();
        Friend friend2 = new Friend();

        friend1.setUser(friendRequest.getUser());
        friend1.setFriendId(friendRequest.getFriendId());

        friend2.setUser(friendRequest.getFriendId());
        friend2.setFriendId(friendRequest.getUser());

        friendsRepository.save(friend1);
        friendsRepository.save(friend2);
    }
}

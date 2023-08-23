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



        Friend friend = new Friend();

        friend.setUser(friendRequest.getUser());
        friend.setFriendId(friendRequest.getFriendId());

        friendsRepository.save(friend);

        friend.setUser(friendRequest.getFriendId());
        friend.setFriendId(friendRequest.getUser());

        friendsRepository.save(friend);
    }
}

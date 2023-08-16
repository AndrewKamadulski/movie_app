package com.andrewkamadulski.movie_app.controller;

import com.andrewkamadulski.movie_app.requestmodels.FriendRequest;
import com.andrewkamadulski.movie_app.service.FriendService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/friends")
public class FriendController {



    public FriendController friendController;

    private FriendService friendService;

    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @PostMapping("/secure/add/friend")
    public void addFriend(@RequestHeader(value="Authorization") String token,
                         @RequestBody FriendRequest friendRequest)  {
        friendService.addFriend(friendRequest);
    };
}

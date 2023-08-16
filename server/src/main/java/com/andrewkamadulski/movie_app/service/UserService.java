package com.andrewkamadulski.movie_app.service;

import com.andrewkamadulski.movie_app.dao.UsersRepository;
import com.andrewkamadulski.movie_app.entity.User;
import com.andrewkamadulski.movie_app.requestmodels.UserRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {

    @Autowired
    private UsersRepository usersRepository;

    public void addUser(UserRequest userRequest) {



        User user = new User();

        user.setUserName(userRequest.getUserName());
        user.setEmail(userRequest.getEmail());

        usersRepository.save(user);
    }


}

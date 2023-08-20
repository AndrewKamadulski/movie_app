package com.andrewkamadulski.movie_app.requestmodels;

import lombok.Data;

@Data
public class UserRequest {
    private Long id;

    private String userName;

    private String email;

}

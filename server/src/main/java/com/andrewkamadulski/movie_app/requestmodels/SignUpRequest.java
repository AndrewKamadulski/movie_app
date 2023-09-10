package com.andrewkamadulski.movie_app.requestmodels;

import lombok.Data;

@Data
public class SignUpRequest {
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
}

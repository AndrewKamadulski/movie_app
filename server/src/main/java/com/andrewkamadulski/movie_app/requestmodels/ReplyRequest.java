package com.andrewkamadulski.movie_app.requestmodels;

import com.andrewkamadulski.movie_app.entity.Review;
import lombok.Data;

@Data
public class ReplyRequest {
    private String replyText;

    private String userName;

    private Review reviewId;


}

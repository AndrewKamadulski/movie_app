package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Reply;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "completeReply", types = { Reply.class })
interface CompleteReply {
    String getReplyText();
//  List<Review> getReviews();
}
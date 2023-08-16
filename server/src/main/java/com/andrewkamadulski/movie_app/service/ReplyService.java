package com.andrewkamadulski.movie_app.service;

import com.andrewkamadulski.movie_app.dao.RepliesRepository;
import com.andrewkamadulski.movie_app.entity.Reply;
import com.andrewkamadulski.movie_app.requestmodels.ReplyRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ReplyService {

    @Autowired
    private RepliesRepository repliesRepository;

    public void saveReply(ReplyRequest replyRequest)  {

        Reply reply = new Reply();

        reply.setUserName(replyRequest.getUserName());
        reply.setReviewId(replyRequest.getReviewId());
        reply.setReplyText(replyRequest.getReplyText());

        repliesRepository.save(reply);
    }

    public void deleteReply(Long replyId)  {

        repliesRepository.deleteById(replyId);
    }




}

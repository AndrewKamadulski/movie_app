package com.andrewkamadulski.movie_app.controller;

import com.andrewkamadulski.movie_app.requestmodels.ReplyRequest;
import com.andrewkamadulski.movie_app.service.ReplyService;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/replies")
public class ReplyController {




    public ReplyController replyController;
    private ReplyService replyService;

    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    };

    @PostMapping("/secure/add/reply")
    public void addReply(@RequestHeader(value="Authorization") String token,
                          @RequestBody ReplyRequest replyRequest) throws Exception {
        replyService.saveReply(replyRequest);
    };

    @PutMapping("/secure/update/reply")
    public void updateReply(@RequestHeader(value="Authorization") String token,
                             @RequestBody ReplyRequest replyRequest) throws Exception {
        replyService.saveReply(replyRequest);
    };

    @DeleteMapping("secure/delete/reply/{id}")
    public void deleteReply(@RequestHeader(value="Authorization") String token,
                             @PathVariable("id") Long id) throws Exception {
        replyService.deleteReply(id);
    };

};


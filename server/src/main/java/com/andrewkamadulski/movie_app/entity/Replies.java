package com.andrewkamadulski.movie_app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name="replies")
@Data
public class Replies {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="user_id")
    private Long userId;

    @Column(name="review_id")
    private Long reviewId;

    @Column(name="reply_text")
    private String reactionText;

    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss")
    @Column(name="created_at")
    private Date createdAt;
}


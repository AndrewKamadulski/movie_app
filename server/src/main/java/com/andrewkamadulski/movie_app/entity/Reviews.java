package com.andrewkamadulski.movie_app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name="reviews")
@Data
public class Reviews {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="user_id")
    private Long userId;

    @Column(name="movie_id")
    private Long movieId;

    @Column(name="review_text")
    private String reviewText;

    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss")
    @Column(name="created_at")
    private Date createdAt;

}


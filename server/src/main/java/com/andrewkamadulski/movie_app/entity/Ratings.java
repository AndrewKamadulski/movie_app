package com.andrewkamadulski.movie_app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="ratings")
@Data
public class Ratings {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="user_id")
    private Long userId;

    @Column(name="movie_id")
    private Long movieId;

    @Column(name="rating")
    private Float rating;
}




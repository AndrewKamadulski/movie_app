package com.andrewkamadulski.movie_app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name="movies")
@Data
public class Movie {
    @Id
    @Column(name="id", nullable = false)
    private Long id;

    @Column(name="title", nullable = false)
    private String title;

    @OneToMany(mappedBy = "movieId", cascade = CascadeType.ALL)
    private List<Review> reviews;


    @OneToMany(mappedBy = "movieId", cascade = CascadeType.ALL)
    private List<Rating> ratings;


}

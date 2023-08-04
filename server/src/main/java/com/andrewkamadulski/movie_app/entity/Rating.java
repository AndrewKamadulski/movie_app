package com.andrewkamadulski.movie_app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="ratings")
@Data
public class Rating {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Long id;

       @Column(name="rating", nullable = false)
    private Float rating;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User userId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movieId;
}




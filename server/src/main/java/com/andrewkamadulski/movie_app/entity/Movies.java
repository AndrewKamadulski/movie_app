package com.andrewkamadulski.movie_app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="movies")
@Data
public class Movies {
    @Id
    @Column(name="id")
    private Long id;

    @Column(name="title")
    private String title;
}

package com.andrewkamadulski.movie_app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="friends")
@Data
public class Friends {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;


    @Column(name="user_id")
    private Long userId;


    @Column(name="friend")
    private Long friendId;

}
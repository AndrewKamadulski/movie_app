package com.andrewkamadulski.movie_app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name="users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Long id;

    @Column(name="name", nullable = false)
    private String userName;

    @Column(name="email", nullable = false)
    private String email;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "friendId", cascade = CascadeType.ALL)
    private List<Friend> friends;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
    private List<Rating> ratings;


}





package com.andrewkamadulski.movie_app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="friends")
@Data
public class Friend {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Long id;


    @ManyToOne(optional = false)
    @JoinColumn(name = "friend_id", referencedColumnName = "id")
    private User friendId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


}


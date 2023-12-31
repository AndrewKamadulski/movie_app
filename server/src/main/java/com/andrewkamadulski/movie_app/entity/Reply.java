package com.andrewkamadulski.movie_app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="replies")
@Data
public class Reply {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Long id;

    @Column(name="reply_text", columnDefinition = "TEXT", nullable = false)
    private String replyText;

    @Column(name="user_name")
    private String userName;

    @ManyToOne(optional = false)
    @JoinColumn(name = "review_id", referencedColumnName = "id")
    private Review reviewId;


}


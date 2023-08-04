package com.andrewkamadulski.movie_app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name="replies")
@Data
public class Reply {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Long id;


    @Column(name="reply_text", columnDefinition = "TEXT", nullable = false)
    private String reactionText;

    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss")
    @Column(name="created_at")
    private Date createdAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "review_id", referencedColumnName = "id")
    private Review reviewId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User userId;
}


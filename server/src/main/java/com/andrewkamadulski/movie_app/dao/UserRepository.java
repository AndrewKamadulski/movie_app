package com.andrewkamadulski.movie_app.dao;
import com.andrewkamadulski.movie_app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}

package com.andrewkamadulski.movie_app.dao;
import com.andrewkamadulski.movie_app.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {

}

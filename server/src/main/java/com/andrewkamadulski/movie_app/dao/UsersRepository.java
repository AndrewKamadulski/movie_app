package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UsersRepository extends JpaRepository<User, Long> {

    @Query(
            value = "SELECT  * FROM users WHERE  name = :userName", nativeQuery = true)
    Page<User> findByUserName(@Param("userName") String userName, Pageable pageable);

}

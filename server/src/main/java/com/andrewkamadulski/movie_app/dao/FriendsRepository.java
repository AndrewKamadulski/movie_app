package com.andrewkamadulski.movie_app.dao;

import com.andrewkamadulski.movie_app.entity.Friend;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = CompleteFriend.class)
public interface FriendsRepository extends JpaRepository<Friend, Long> {

    @Query(
            value = """                    
                    select f.friend_id, f.user_id, u.id, u.name from friends f
                    join users u on  f.friend_id = u.id 
                    WHERE user_id = :userId
                    """
            , nativeQuery = true)
    Page<Friend> findFriends(@Param("userId") Long userId, Pageable pageable);


}


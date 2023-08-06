package com.andrewkamadulski.movie_app.config;

import com.andrewkamadulski.movie_app.entity.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private String theAllowedOrigins = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT};

        config.exposeIdsFor(Friend.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Movie.class);
        config.exposeIdsFor(Rating.class);
        config.exposeIdsFor(Reply.class);


        disableHttpMethods(Friend.class, config, theUnsupportedActions);
//        disableHttpMethods(Review.class, config, theUnsupportedActions);
        disableHttpMethods(User.class, config, theUnsupportedActions);
        disableHttpMethods(Movie.class, config, theUnsupportedActions);
        disableHttpMethods(Rating.class, config, theUnsupportedActions);
        disableHttpMethods(Reply.class, config, theUnsupportedActions);


        /* Configure CORS Mapping */
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins);
    }

    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions));
    }
}
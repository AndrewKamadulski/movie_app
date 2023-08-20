import MovieModel from "./MovieModel";
import UserModel from "./UserModel";

class ReviewModel  {

    user: UserModel;
    movie: MovieModel;
    reviewText: string;

    constructor(user: UserModel, movie: MovieModel, reviewText: string){
        this.user = user;
        this.movie = movie;
        this.reviewText = reviewText;
    }

}

export default ReviewModel;
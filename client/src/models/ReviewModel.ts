import MovieModel from "./MovieModel";
import UserModel from "./UserModel";

class ReviewModel  {
   
    user: UserModel;
    movie: MovieModel;
    reviewText: string;
    id?: number;

    constructor( user: UserModel, movie: MovieModel, reviewText: string, id?: number){
       
        this.user = user;
        this.movie = movie;
        this.reviewText = reviewText;
        this.id = id; 
    }

}

export default ReviewModel;
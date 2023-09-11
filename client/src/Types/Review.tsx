import MovieModel from "../models/MovieModel";
import UserModel from "../models/UserModel";
import Reply from "./Replies";

type Review = {
    createdAt: string;
    id: number;
    movieId: MovieModel;
    userId: UserModel;
    _links: object;
    reviewText: string;
    replies: Reply[];
}

export default Review;
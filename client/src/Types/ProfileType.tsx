import Friend from "./Friend";
import Rating from "./Rating";
import Review from "./Review";

type ProfileType = {
    id: number;
    userName: string;
    email: string;
    _embedded: {ratings: Rating[], reviews: Review[], friends: Friend[]};
  }

  export default ProfileType;
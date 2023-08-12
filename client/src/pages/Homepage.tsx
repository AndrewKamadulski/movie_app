import { MovieCards } from "../components/MovieCards";
import { MovieReviews } from "../components/MovieReviews";

export const Homepage: React.FC<{movieObj: unknown, setMovieObj: React.Dispatch<React.SetStateAction<unknown>>}> = (props) => {
    const {movieObj, setMovieObj} = props;

    

    return(
        <div>
            <MovieReviews />
            {/* <div className="mx-5 my-2">
            <MovieCards
            movieObj={movieObj}
            setMovieObj={setMovieObj}>
            </MovieCards>
            </div> */}
        </div>
    );
}
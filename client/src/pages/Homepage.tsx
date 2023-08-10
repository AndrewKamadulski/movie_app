import { MovieCards } from "../components/MovieCards";
import { Reviews } from "../components/Reviews";

export const Homepage: React.FC<{movieObj: unknown, setMovieObj: React.Dispatch<React.SetStateAction<unknown>>}> = (props) => {
    const {movieObj, setMovieObj} = props;

    

    return(
        <div>
            <Reviews />
            {/* <div className="mx-5 my-2">
            <MovieCards
            movieObj={movieObj}
            setMovieObj={setMovieObj}>
            </MovieCards>
            </div> */}
        </div>
    );
}
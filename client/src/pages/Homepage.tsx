import MovieObj from "../Types/MovieObj";
import { MovieCards } from "../components/MovieCards/MovieCards";

export const Homepage: React.FC<{ movieArr: MovieObj[], setMovieArr: React.Dispatch<React.SetStateAction<MovieObj[]>>}> = (props) => {
    const {movieArr, setMovieArr} = props;    

    return(
        <div>            
            <div className="mx-5 my-2">               
            <MovieCards           
            movieArr={movieArr}
            setMovieArr={setMovieArr} />          
            </div>
        </div>
    );
}
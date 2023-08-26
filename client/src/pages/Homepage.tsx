import { MovieCards } from "../components/MovieCards";
import { ReviewForm } from "../components/ReviewForm/ReviewForm";


export const Homepage: React.FC<{ movieArr: unknown, setMovieArr: React.Dispatch<React.SetStateAction<unknown>>}> = (props) => {
    const {movieArr, setMovieArr} = props;

    

    return(
        <div>            
            <div className="mx-5 my-2">               
            <MovieCards           
            movieArr={movieArr}
            setMovieArr={setMovieArr}>
            </MovieCards>
            </div>
        </div>
    );
}
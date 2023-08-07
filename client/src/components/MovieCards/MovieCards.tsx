import { setState, useState } from "react";
import "./card.css";

export const MovieCards = () => {
  const [movieArr, setMovieArr] = useState([]);
  const [movieObj, setMovieObj] = useState({});

  const singleMovie = function (e) {
    const obj = movieArr.find((o) => o.id === parseInt(e.target.id));
    setMovieObj(obj);
    console.log(obj);
    const key = process.env.REACT_APP_API_KEY;
    console.log(key)
  };

  useEffect(() => {

    const fetchRequest = async () => {

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=8e8d1fb7683b829d728e204db461103b&page=&language=en-US&sort_by=popularity.desc&with_genres=27`
        )

        if(!response) {
            throw new Error ("Unable to fetch movie data.")
        }

        const responseJson = await response.json().then(function (data) {
            setMovieArr(data.results);
            console.log(movieArr);;

      };
    }



     

    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";

      const url: string = `${baseUrl}?page=0&size=9`;

      const response = await fetch(url);

      if (!response) {      
        throw new Error("Something went wrong!");        
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.books;

      const loadedBooks: BookModel[] = [];

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if(isLoading) {
    return(
      <SpinnerLoading />
    );
  }

  if(httpError) {
    return(
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    );
  }

  
  fetchRequest();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="mt-3">
            <div className="row">
              {movieArr.map((movie) => (
                <div
                  key={movie.id.toString()}
                  className="col-md-6 col-lg-4 col-xl-3 d-flex"
                >
                  <div className="movie-card card">
                    <div
                      onClick={singleMovie}
                      id={movie.id}
                      className="col-3 p-2"
                    >
                      <img
                        style={{ height: 500 }}
                        src = {`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

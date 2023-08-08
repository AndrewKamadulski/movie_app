export const SingleMovie: React.FC<{ movieObj: unknown }> = (props) => {
  const { movieObj } = props;

  return (
    <>
      <div className="container-fluid mt-3 mb-5">
        <div className="movie-detail">
          <div className="movie_title">
            {movieObj ? movieObj.original_title : ""}
          </div>
          <div className="movie-info px-3">
            <img
              className="movie-backdrop"
              src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
              alt=""
            />
            <div className="movie-overview">
              <div>
                <h3 className="font-weight-bold">Movie Overview:</h3>
                {movieObj ? movieObj.overview : ""}
                <span>
                  <hr />
                </span>
                Release date:<p>{movieObj.release_date}</p>
                <span>
                  <hr />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

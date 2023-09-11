class MovieModel {
    constructor(movieId, title) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = movieId;
        this.title = title;
    }
}
export default MovieModel;

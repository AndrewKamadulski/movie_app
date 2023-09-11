class RatingModel {
    constructor(rating, userId, movieId) {
        Object.defineProperty(this, "rating", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "userId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "movieId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.rating = rating;
        this.userId = userId;
        this.movieId = movieId;
    }
}
export default RatingModel;

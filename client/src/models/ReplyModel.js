class ReplyModel {
    constructor(userName, reviewId, replyText) {
        Object.defineProperty(this, "userName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reviewId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "replyText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.userName = userName;
        this.reviewId = reviewId;
        this.replyText = replyText;
    }
}
export default ReplyModel;

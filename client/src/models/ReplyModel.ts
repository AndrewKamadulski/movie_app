import ReviewModel from "./ReviewModel";

class ReplyModel {
    userName: string;
    reviewId: ReviewModel;
    replyText: string;

    constructor(userName: string, reviewId: ReviewModel, replyText: string) {
        this.userName = userName;
        this.reviewId = reviewId;
        this. replyText = replyText;
    }
}

export default ReplyModel;
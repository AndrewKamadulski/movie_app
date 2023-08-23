import UserModel from "./UserModel";

class FriendModel {
    user: UserModel;
    friendId: UserModel;


    constructor(user: UserModel, friendId: UserModel){
        this.user = user;
        this.friendId = friendId;
    }
}

export default FriendModel;
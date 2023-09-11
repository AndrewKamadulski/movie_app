class FriendModel {
    constructor(user, friendId) {
        Object.defineProperty(this, "user", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "friendId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.user = user;
        this.friendId = friendId;
    }
}
export default FriendModel;

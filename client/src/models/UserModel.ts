class UserModel {
    id: number;
    userName: string;
    email: string;

    constructor(id: number, userName: string, email: string) {
        this.id= id;
        this.userName= userName;
        this.email = email;
    }

}

export default UserModel; 
class SignUpModel {


firstName: string;
lastName: string;
userName: string;
email: string;


constructor(firstName: string, lastName: string, userName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
}
}

export default SignUpModel;
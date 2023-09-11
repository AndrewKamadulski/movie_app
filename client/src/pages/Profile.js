import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserModel from "../models/UserModel";
import FriendModel from "../models/FriendModel";
export const Profile = () => {
    const { userName } = useParams();
    const { authState } = useOktaAuth();
    const [friendAdded, setFriendAdded] = useState(false);
    const [profileUser, setProfileUser] = useState();
    let isFriend;
    let isSameUser = false;
    console.log(profileUser);
    if (profileUser && profileUser._embedded && profileUser._embedded.friends) {
        isFriend = profileUser._embedded.friends.filter((friend) => friend.friendId.userName === authState?.idToken?.claims.name);
    }
    if (authState && userName === authState.idToken?.claims.name) {
        isSameUser = true;
    }
    useEffect(() => {
        fetch(`http://localhost:8080/api/users/search/findByUserName?userName=${userName}`).then(function (response) {
            response.json().then(function (data) {
                try {
                    console.log(data._embedded.users[0]);
                    setProfileUser(data._embedded.users[0]);
                }
                catch {
                    console.error;
                }
            });
        });
    }, [userName, friendAdded]);
    const addFriend = async (data) => {
        if (authState && authState.isAuthenticated) {
            const url = `http://localhost:8080/api/friends/secure/add/friend`;
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            const addFriendResponse = await fetch(url, requestOptions);
            if (!addFriendResponse.ok) {
                throw new Error("Unable to add friend.");
            }
            setFriendAdded(true);
            console.log("Friend added.");
        }
    };
    const handleAddFriend = () => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { user_id, name, email } = authState?.idToken?.claims;
        const user = new UserModel(user_id, name, email);
        const friendId = new UserModel(profileUser.id, profileUser.userName, profileUser.email);
        const friendRequest = new FriendModel(user, friendId);
        addFriend(friendRequest);
    };
    if (!authState?.isAuthenticated) {
        return (_jsx("div", { className: "text-danger", style: { height: 500 }, children: _jsx("h4", { className: "m-5", children: "You must logged in to see this page. Use the navigation links above to sign up or log in!" }) }));
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: _jsxs("div", { className: "m-3 bg-red rounded", children: [_jsxs("h2", { className: "p-3", children: [isSameUser ? "Your" : userName + "'s", " profile"] }), !isSameUser && !isFriend && (_jsx("button", { className: "", onClick: () => {
                                handleAddFriend();
                            }, children: "Add Friend" }))] }) }), _jsxs("div", { className: "mb-3 row profile-container", children: [_jsx("div", { className: "col-12 mb-3 col-lg-8", children: profileUser && (_jsx("div", { className: "p-4", children: profileUser._embedded &&
                                profileUser._embedded.reviews &&
                                profileUser._embedded.reviews.map((review) => (_jsx("div", { className: "py-1", children: _jsx(Link, { className: "text-decoration-none text-light", to: `/review/` + review.id, children: _jsxs("div", { className: "card", children: [_jsx("div", { className: "column", children: _jsx("div", { className: "card-header bg-red", children: _jsxs("div", { className: " row", children: [_jsx("div", { className: "col-12 col-md-5 ms-2 ", datatype: (review.id).toString(), children: _jsx("div", { children: _jsx(Link, { className: "text-decoration-none text-light", to: `/movie/` + review.movieId.id, children: review.movieId.title }) }) }), _jsxs("div", { className: "col-12 col-md-6 text-end ms-auto", children: [review.createdAt.substring(0, 10), " @", " ", review.createdAt.substring(11, 19)] })] }) }) }), _jsxs("div", { className: "p-2 pb-0 text-dark", children: [review.reviewText, _jsx("hr", {})] }, review.id), _jsxs("p", { className: "ms-2 text-dark", children: [review.replies.length, " Replies: Click to", " ", review.replies.length > 0 ? "see" : "start", " the discussion!"] })] }) }) }, review.id))) })) }), _jsxs("div", { className: "col-12 col-lg-3 w-25 ", children: [_jsx("div", { className: "bg-red rounded mt-5 border border-white ", children: _jsxs("h4", { children: [isSameUser ? "Your" : userName + "'s", " friends"] }) }), _jsxs("div", { className: "bg-light rounded border border-dark ", children: [profileUser &&
                                        profileUser._embedded &&
                                        !profileUser._embedded.friends && (_jsx("div", { className: "text-dark", children: "No friends currently" })), profileUser &&
                                        profileUser._embedded &&
                                        profileUser._embedded.friends &&
                                        profileUser._embedded.friends.map((friend) => (_jsx("button", { className: "btn w-100 display-block mb-2", children: _jsx(Link, { className: "text-decoration-none text-dark fs-3", to: `/profile/${friend.friendId.userName}`, children: friend.friendId.userName }) }, friend.friendId.id)))] })] })] })] }));
};

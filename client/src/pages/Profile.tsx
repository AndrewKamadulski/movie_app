import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Profile = () => {

    const {userName}= useParams();

    useEffect(() => {
        fetch(
          `http://localhost:8080/api/users/search/findByUserName?userName=${userName}`
        ).then(function (response) {
          response.json().then(function (data) {
            try {
             console.log(data);
            } catch {
              console.error;
            }
          });
        });
      }, []);


    return(
        <div>
          {userName}
        </div>
    );
}
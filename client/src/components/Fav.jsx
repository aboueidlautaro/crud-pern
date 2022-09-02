import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

function Fav({ id }) {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const status = authState.status;
  const idArticle = id;
  console.log(authState);

  const handleClick = (status, data) => {
    if (!status) {
      navigate("/login");
    } else {
      axios
        .post("http://localhost:3001/favs", data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          navigate("/");
        });
    }
  };
  return (
    <button onClick={handleClick}>
      <span role="img" aria-label="fav article">
        ❤️
      </span>
    </button>
  );
}

export default Fav;

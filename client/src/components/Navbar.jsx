import "../App.css";
import { NavLink } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [authState, setAuthState] = useState({
    username: "",
    autor: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            autor: response.data.autor,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <>
      <div>
        <div>
          <div>
            {!authState.status ? (
              <>
                <div>
                  <div>
                    <NavLink to="/">Home</NavLink>
                  </div>

                  <div>
                    <NavLink to="/login">Iniciar sesión</NavLink>
                    <NavLink to="/register">Registrarse</NavLink>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/createpost">Publicar</NavLink>
                </div>
              </>
            )}
          </div>

          {authState.status ? (
            <div>
              <NavLink to={"/profile/" + authState.id}>
                <span>{authState.autor}</span>
                <small>{authState.username}</small>
              </NavLink>
              <button onClick={logout}>Cerrar sesión</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;

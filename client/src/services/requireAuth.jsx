import axios from "axios";
import { useEffect, useState } from "react";

import { Navigate, Outlet, useParams } from "react-router-dom";

const CapaRequireAuth = () => {
  let { id } = useParams();

  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.username);
    });
  }, []);

  if (!username) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default CapaRequireAuth;

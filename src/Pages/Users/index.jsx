import axios from "axios";
import React, { useReducer } from "react";

const url = "https://jsonplaceholder.typicode.com/users";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AXIOS_START":
      return { data: [], loading: true, error: "" };
    case "AXIOS_SUCCESS":
      return { data: action.payload, loading: false, error: "" };
    case "AXIOS_ERROR":
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

const Users = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, error } = state;

  const getData = () => {
    dispatch({ type: "AXIOS_START" });

    axios
      .get(url)
      .then((response) => {
        dispatch({ type: "AXIOS_SUCCESS", payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: "AXIOS_ERROR", payload: err.message });
      });
  };

  return (
    <div>
      <button onClick={getData} disabled={loading}>
        Get data
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {data.map((user) => (
            <div key={user.id}>
              <p>Name: {user.name}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Phone:{user.phone}</p>
              <p>Website:{user.website}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
